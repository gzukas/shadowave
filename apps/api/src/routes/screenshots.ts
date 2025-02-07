import { dns } from 'bun';
import { Elysia, form, t } from 'elysia';
import puppeteer, {
  type Device,
  type Browser,
  KnownDevices
} from 'puppeteer-core';
import { url, deviceType } from '@workspace/schema';

type DeviceType = typeof deviceType.static;

const colorSchemes = ['dark', 'light'] as const;

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
  browserURL: string;
}

function keepAlive(browser: Browser, everyMs: number) {
  return setInterval(() => {
    if (!browser.connected) {
      console.error('Browser disconnected');
    }
  }, everyMs);
}

async function* takeScreenshots(
  browser: Browser,
  url: string,
  options: { deviceType?: DeviceType }
) {
  const { deviceType = 'desktop' } = options;
  const page = await browser.newPage();
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

  await page.close();
}

export const screenshots = async (options: ScreenshotsOptions) => {
  const { protocol, hostname, port } = new URL(options.browserURL);
  const [{ address }] = await dns.lookup(hostname, { family: 4 });
  const browser = await puppeteer.connect({
    browserURL: `${protocol}//${address}:${port}`,
    downloadBehavior: {
      policy: 'deny'
    }
  });

  const aliveTimer = keepAlive(browser, 60_000 /* 1 minute */);

  return new Elysia()
    .get(
      '/screenshots/:url',
      async ({ params: { url }, query }) => {
        const formData = form({});
        for await (const [colorScheme, screenshot] of takeScreenshots(
          browser,
          url,
          query
        )) {
          formData.append(colorScheme, screenshot, `${colorScheme}.webp`);
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
    )
    .onStop(() => clearInterval(aliveTimer));
};
