import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import screenshots from './routes/screenshots';

const tlsCert = process.env.SHADOWAVE_TLS_CERT;
const tlsKey = process.env.SHADOWAVE_TLS_KEY;

const app = new Elysia()
  .use(
    cors({
      origin: process.env.SHADOWAVE_CORS_ORIGIN?.split(',') ?? true
    })
  )
  .use(
    screenshots({
      browserURL: process.env.SHADOWAVE_BROWSER_URL ?? 'http://localhost:9222'
    })
  )
  .listen({
    hostname: process.env.SHADOWAVE_HOST || '0.0.0.0',
    port: process.env.SHADOWAVE_PORT || 3001,
    tls: {
      ...(tlsCert && { cert: Bun.file(tlsCert) }),
      ...(tlsKey && { key: Bun.file(tlsKey) })
    }
  });

console.log(`🦊 Elysia is running at ${app.server?.url}`);

export type App = typeof app;
