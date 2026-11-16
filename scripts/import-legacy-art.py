"""Convert the original PCX/BMP sprites to PNG without altering their RGB pixels.

Usage: python3 scripts/import-legacy-art.py SOURCE_DIR OUTPUT_DIR
Allegro's magenta mask becomes alpha; supports the original RGB/palette PCX and uncompressed 8-bit palette BMP.
"""
import binascii
import struct
import sys
import zlib
from pathlib import Path


def convert(source: Path, destination: Path) -> None:
    data = source.read_bytes()
    if data[0] != 10 or data[2:4] != bytes([1, 8]):
        raise ValueError(f'Unsupported PCX: {source}')
    x0, y0, x1, y1 = struct.unpack_from('<4H', data, 4)
    width, height = x1 - x0 + 1, y1 - y0 + 1
    planes, stride = data[65], struct.unpack_from('<H', data, 66)[0]
    if planes not in (1, 3):
        raise ValueError('Expected one palette plane or three RGB planes')
    decoded, cursor = bytearray(), 128
    while len(decoded) < height * stride * planes:
        value, count = data[cursor], 1
        cursor += 1
        if value >= 192:
            count, value = value & 63, data[cursor]
            cursor += 1
        decoded.extend([value] * count)
    palette, pixels = data[-768:], bytearray()
    for y in range(height):
        pixels.append(0)  # PNG filter: none
        for x in range(width):
            offset = y * stride * planes + x
            rgb = tuple(decoded[offset + p * stride] for p in range(3)) if planes == 3 else tuple(palette[decoded[offset] * 3:decoded[offset] * 3 + 3])
            pixels.extend((*rgb, 0 if rgb == (255, 0, 255) else 255))

    write_png(destination, width, height, bytes(pixels))


def write_png(destination: Path, width: int, height: int, pixels: bytes) -> None:
    def chunk(kind: bytes, body: bytes) -> bytes:
        return struct.pack('>I', len(body)) + kind + body + struct.pack('>I', binascii.crc32(kind + body) & 0xffffffff)
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>2I5B', width, height, 8, 6, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(pixels)) + chunk(b'IEND', b'')
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(png)


def convert_bmp(source: Path, destination: Path) -> None:
    data = source.read_bytes()
    offset = struct.unpack_from('<I', data, 10)[0]
    width, signed_height = struct.unpack_from('<ii', data, 18)
    depth, compression = struct.unpack_from('<HI', data, 28)
    if data[:2] != b'BM' or depth != 8 or compression != 0:
        raise ValueError(f'Expected uncompressed palette BMP: {source}')
    height, stride = abs(signed_height), ((width + 3) // 4) * 4
    pixels = bytearray()
    for y in range(height):
        pixels.append(0)
        row = height - 1 - y if signed_height > 0 else y
        for x in range(width):
            index = data[offset + row * stride + x]
            b, g, r, _ = data[54 + index * 4:58 + index * 4]
            pixels.extend((r, g, b, 0 if (r, g, b) == (255, 0, 255) else 255))
    write_png(destination, width, height, bytes(pixels))


if __name__ == '__main__':
    source, output = map(Path, sys.argv[1:3])
    for old, new in [('efeitoLife', 'bar-sheet'), ('bordalife', 'bar-border'), ('terra', 'earth'), ('TabuleiroProfissional', 'garden')]:
        convert(source / f'{old}.pcx', output / f'{new}.png')

    for old, new in [('estrelinhas', 'star-meter'), ('trofeu', 'trophy-sheet')]:
        convert_bmp(source / f'{old}.bmp', output / f'{new}.png')
