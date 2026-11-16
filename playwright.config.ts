import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4174', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: [
    { command: 'node scripts/test-signaling.cjs', url: 'http://127.0.0.1:9000', reuseExistingServer: !process.env.CI },
    { command: 'pnpm dev --port 4174', url: 'http://127.0.0.1:4174', reuseExistingServer: !process.env.CI, env: { VITE_PEER_HOST: '127.0.0.1', VITE_PEER_PORT: '9000', VITE_PEER_SECURE: 'false', VITE_ICE_SERVERS: '[]' } },
  ],
});
