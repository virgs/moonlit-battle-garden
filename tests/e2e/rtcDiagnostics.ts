import type { Page, TestInfo } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

declare global {
  interface Window {
    rtcTest: { connections: RTCPeerConnection[]; drop: boolean; delayMs: number };
  }
}

/** Test-only impairment at the RTC send boundary, not an OS/network emulator. */
export async function observeRtc(page: Page) {
  await page.addInitScript(() => {
    window.rtcTest = { connections: [], drop: false, delayMs: 0 };
    const Native = window.RTCPeerConnection;
    window.RTCPeerConnection = class extends Native {
      constructor(...args: ConstructorParameters<typeof RTCPeerConnection>) {
        super(...args); window.rtcTest.connections.push(this);
      }
    };
    const send = RTCDataChannel.prototype.send;
    RTCDataChannel.prototype.send = function (data: string | Blob | ArrayBuffer | ArrayBufferView<ArrayBuffer>) {
      if (window.rtcTest.drop) return;
      if (!window.rtcTest.delayMs) return send.call(this, data as never);
      setTimeout(() => { if (this.readyState === 'open' && !window.rtcTest.drop) send.call(this, data as never); }, window.rtcTest.delayMs);
    };
  });
}

/** Keep route types/timing, never IP addresses, credentials or invite IDs. */
export async function attachRtc(page: Page, info: TestInfo, name: string) {
  const summary = await page.evaluate(async () => Promise.all(window.rtcTest.connections.map(async connection => {
    const stats = await connection.getStats();
    const all = [...stats.values()];
    const transport = all.find(report => report.type === 'transport' && report.selectedCandidatePairId);
    const pair = transport ? stats.get(transport.selectedCandidatePairId) : all.find(report => report.type === 'candidate-pair' && report.nominated && report.state === 'succeeded');
    const local = pair && stats.get(pair.localCandidateId), remote = pair && stats.get(pair.remoteCandidateId);
    return {
      connectionState: connection.connectionState,
      localCandidateType: local?.candidateType ?? null, remoteCandidateType: remote?.candidateType ?? null,
      protocol: local?.protocol ?? null,
      rttMs: pair?.currentRoundTripTime == null ? null : Math.round(pair.currentRoundTripTime * 1000),
      bytesSent: pair?.bytesSent ?? null, bytesReceived: pair?.bytesReceived ?? null,
    };
  })));
  await mkdir(info.outputDir,{recursive:true});
  const path=info.outputPath(`${name}.json`);
  await writeFile(path,JSON.stringify(summary,null,2)+'\n');
  await info.attach(name, { path, contentType: 'application/json' });
  return summary;
}
