import { defineConfig, devices } from '@playwright/test';

// Opt-in external-service QA. Ordinary CI remains isolated from public signaling.
const browserName = process.env.ONLINE_BROWSER === 'webkit' ? 'webkit' : 'chromium';
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'online.spec.ts',
  outputDir: `./test-results/public-online-${browserName}`,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: process.env.ONLINE_URL || 'https://virgs.github.io/moonlit-battle-garden/',
    trace: 'retain-on-failure', screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices[browserName==='webkit'?'Desktop Safari':'Desktop Chrome'], browserName } },
    { name: 'mobile', use: { ...devices['iPhone 13'], browserName } },
  ],
});
