import { Elysia, form, t } from 'elysia';
import puppeteer, { type Browser, type Device, KnownDevices } from 'puppeteer';

const deviceType = t.Union([t.Literal('mobile'), t.Literal('tablet')]);

type ColorScheme = 'light' | 'dark';
type DeviceType = typeof deviceType.static;

const defaultDeviceMapping: Record<DeviceType, Device> = {
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
  .decorate('browser', await puppeteer.launch({ headless: 'shell'}))
  .derive({ as: 'scoped' }, ({ browser }) => ({
    async *screenshots(url: string, options: ScreenshotsOptions) {
      const {
        deviceType,
        deviceMapping = defaultDeviceMapping,
        colorSchemes = defaultColorSchemes
      } = options;

      const page = await browser.newPage();
      if (deviceType) {
        const device = deviceMapping[deviceType];
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
    console.log('closing browser');
    await browser.close();
    console.log('closed');
  });

export const screenshots = new Elysia().use(screenshotService).get(
  '/screenshots/:url',
  async ({ params: { url }, query, screenshots }) => {
    const formData = form({});
    for await (const [colorScheme, screenshot] of screenshots(
      decodeURIComponent(url),
      query
    )) {
      formData.append(colorScheme, new Blob([screenshot]));
    }
    return formData;
  },
  {
    query: t.Object({
      deviceType: t.Optional(deviceType)
    })
  }
);
