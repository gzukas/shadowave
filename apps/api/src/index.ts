import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import closeWithGrace from 'close-with-grace';
import { screenshots } from './routes/screenshots.js';

const app = new Elysia()
  .use(
    cors({
      origin: process.env.SHADOWAVE_CORS_ORIGIN?.split(',') ?? true
    })
  )
  .use(screenshots)
  .listen({
    hostname: process.env.SHADOWAVE_HOST || '0.0.0.0',
    port: process.env.SHADOWAVE_PORT || 3001
  });

closeWithGrace({ delay: 2000 }, async ({ err }) => {
  if (err) {
    console.error(err);
  }
  await app.stop();
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
