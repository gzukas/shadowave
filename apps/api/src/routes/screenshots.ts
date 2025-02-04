import { Elysia, form, t } from 'elysia';
import puppeteer, { type Device, KnownDevices } from 'puppeteer';
import { url, deviceType } from '@workspace/schema';

type DeviceType = typeof deviceType.static;

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

interface ScreenshotsOptions {
  colorScheme: 'light' | 'dark';
  deviceType?: DeviceType;
}

export const screenshots = async () => {
  const browser = await puppeteer.launch({
    headless: 'shell'
  });

  const screenshot = async (url: string, options: ScreenshotsOptions) => {
    const { deviceType = 'desktop', colorScheme } = options;
    const page = await browser.newPage();
    await Promise.all([
      page.emulate(deviceMapping[deviceType]),
      page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: colorScheme }
      ])
    ]);
    await page.goto(url, { waitUntil: 'networkidle0' });
    const screenshot = await page.screenshot({
      type: 'webp'
    });
    await page.close();
    return [colorScheme, new Blob([screenshot])] as const;
  };

  return new Elysia()
    .get(
      '/screenshots/:url',
      async ({ params: { url }, query }) => {
        const screenshots = await Promise.all([
          screenshot(url, { ...query, colorScheme: 'dark' }),
          screenshot(url, { ...query, colorScheme: 'light' })
        ]);
        return form(Object.fromEntries(screenshots));
      },
      {
        params: t.Object({
          url
        }),
        query: t.Object({
          deviceType: t.Optional(deviceType)
        }),
        transform({ params }) {
          params.url = decodeURIComponent(params.url);
        }
      }
    )
    .onStop(() => browser.close());
};
