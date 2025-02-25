import { KnownDevices, type Browser, type Device } from 'puppeteer-core';
import type { deviceType } from '@workspace/schema/schema';

type DeviceType = typeof deviceType.static;
type ColorScheme = 'dark' | 'light';

const deviceMapping: Record<DeviceType, Device> = {
  mobile: KnownDevices['iPhone 15'],
  tablet: KnownDevices['iPad'],
  desktop: {
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/132.0.6834.110 Safari/537.36',
    viewport: {
      width: 1200,
      height: 630
    }
  }
};

export interface TakeScreenshotsOptions {
  deviceType?: DeviceType;
  colorSchemes?: ColorScheme[];
}

export async function* takeScreenshots(
  browser: Browser,
  url: string,
  options: TakeScreenshotsOptions = {}
) {
  const { deviceType = 'desktop', colorSchemes = ['dark', 'light'] } = options;
  const page = await browser.newPage();
  try {
    await page.emulate(deviceMapping[deviceType]);
    for (const colorScheme of colorSchemes) {
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: colorScheme }
      ]);
      await page.goto(url, { waitUntil: 'networkidle0' });
      const screenshot = await page.screenshot({
        type: 'webp'
      });
      yield [colorScheme, new Blob([screenshot])] as const;
    }
  } finally {
    await page.close();
  }
}
