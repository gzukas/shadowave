import { Elysia, form, t } from 'elysia';
import puppeteer, { type Device, KnownDevices } from 'puppeteer';
import { url, deviceType } from '@workspace/schema';

type ColorScheme = 'light' | 'dark';
type DeviceType = typeof deviceType.static;

const defaultDeviceMapping: Partial<Record<DeviceType, Device>> = {
  mobile: KnownDevices['iPhone 15'],
  tablet: KnownDevices['iPad']
};

const defaultColorSchemes: ColorScheme[] = ['dark', 'light'];

interface ScreenshotsOptions {
  deviceType?: DeviceType;
  deviceMapping?: Record<DeviceType, Device>;
  colorSchemes?: ColorScheme[];
}

const screenshotService = new Elysia({ name: 'Service.Screenshot' })
  .decorate('browser', await puppeteer.launch({ headless: 'shell' }))
  .derive({ as: 'scoped' }, ({ browser }) => ({
    async *screenshots(url: string, options: ScreenshotsOptions) {
      const {
        deviceType,
        deviceMapping = defaultDeviceMapping,
        colorSchemes = defaultColorSchemes
      } = options;

      const page = await browser.newPage();
      const device = deviceType ? deviceMapping[deviceType] : null;

      if (device) {
        await page.emulate(device);
      }

      for (const colorScheme of colorSchemes) {
        await page.emulateMediaFeatures([
          { name: 'prefers-color-scheme', value: colorScheme }
        ]);
        await page.goto(url, { timeout: 100000, waitUntil: 'networkidle0' });
        const screenshot = await page.screenshot({
          fullPage: true,
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
      params.url = decodeURIComponent(params.url)
    },
  }
);
