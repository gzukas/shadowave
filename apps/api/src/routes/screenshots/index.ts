import { dns } from 'bun';
import Elysia, { form, t } from 'elysia';
import puppeteer from 'puppeteer-core';
import { url, deviceType } from '@workspace/schema';
import { takeScreenshots } from './takeScreenshots';

interface ScreenshotsOptions {
  browserURL: string;
}

export default async function screenshots(options: ScreenshotsOptions) {
  const { protocol, hostname, port } = new URL(options.browserURL);
  const [{ address }] = await dns.lookup(hostname, { family: 4 });
  const browserURL = `${protocol}//${address}:${port}`;

  return new Elysia().group('/screenshots', app =>
    app
      .resolve(async () => {
        const browser = await puppeteer.connect({
          browserURL,
          downloadBehavior: {
            policy: 'deny'
          }
        });
        return { browser };
      })
      .onAfterResponse(({ browser }) => browser?.disconnect())
      .get(
        '/:url',
        async ({ params: { url }, query, browser }) => {
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
  );
}
