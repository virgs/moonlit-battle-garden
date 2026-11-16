"""Convert the original PCX sprites to PNG without altering their RGB pixels.

Usage: python3 scripts/import-legacy-art.py SOURCE_DIR OUTPUT_DIR
Allegro's magenta mask becomes alpha; supports the original 8-bit RGB/palette PCX.
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

    def chunk(kind: bytes, body: bytes) -> bytes:
        return struct.pack('>I', len(body)) + kind + body + struct.pack('>I', binascii.crc32(kind + body) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>2I5B', width, height, 8, 6, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(pixels)) + chunk(b'IEND', b'')
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(png)


if __name__ == '__main__':
    source, output = map(Path, sys.argv[1:3])
    for old, new in [('efeitoLife', 'bar-sheet'), ('bordalife', 'bar-border'), ('terra', 'earth'), ('TabuleiroProfissional', 'garden')]:
        convert(source / f'{old}.pcx', output / f'{new}.png')
