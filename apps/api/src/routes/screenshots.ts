import { Elysia, form, t } from 'elysia';
import puppeteer, { type Device, KnownDevices } from 'puppeteer';
import { url, deviceType } from '@workspace/schema';

type ColorScheme = 'light' | 'dark';
type DeviceType = typeof deviceType.static;

const TIMEOUT = 100000;

const defaultColorSchemes: ColorScheme[] = ['dark', 'light'];
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
  deviceType?: DeviceType;
  colorSchemes?: ColorScheme[];
}

const screenshotService = new Elysia({ name: 'Service.Screenshot' })
  .decorate('browser', await puppeteer.launch({ headless: 'shell' }))
  .derive({ as: 'scoped' }, ({ browser }) => ({
    async *screenshots(url: string, options: ScreenshotsOptions) {
      const { deviceType = 'desktop', colorSchemes = defaultColorSchemes } =
        options;

      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.emulate(deviceMapping[deviceType]);
      await page.goto(url, { timeout: TIMEOUT, waitUntil: 'networkidle0' });

      for (const colorScheme of colorSchemes) {
        await page.emulateMediaFeatures([
          { name: 'prefers-color-scheme', value: colorScheme }
        ]);
        await page.waitForNetworkIdle({ timeout: TIMEOUT });
        const screenshot = await page.screenshot({
          type: 'webp'
        });
        yield [colorScheme, screenshot] as const;
      }

      await page.close();
    }
  }))
  .onStop(async ({ decorator: { browser } }) => {
    await browser.close();
  });

export const screenshots = new Elysia().use(screenshotService).get(
  '/screenshots/:url',
  async ({ params: { url }, query, screenshots }) => {
    const formData = form({});
    for await (const [colorScheme, screenshot] of screenshots(
      decodeURIComponent(url),
      query
    )) {
      formData.append(
        colorScheme,
        new Blob([screenshot]),
        `${colorScheme}.webp`
      );
    }
    return formData;
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
);
