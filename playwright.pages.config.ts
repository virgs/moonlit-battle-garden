import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/pages',
  outputDir: './test-results/pages',
  use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', deviceScaleFactor: 1, viewport: { width: 390, height: 844 }, baseURL: 'http://127.0.0.1:4176/moonlit-battle-garden/', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: { command: 'VITE_BASE_PATH=/moonlit-battle-garden/ pnpm preview --port 4176', url: 'http://127.0.0.1:4176/moonlit-battle-garden/', reuseExistingServer: false },
});
