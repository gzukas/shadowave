declare module 'bun' {
  interface Env {
    SHADOWAVE_HOST?: string;
    SHADOWAVE_PORT?: string;
    SHADOWAVE_CORS_ORIGIN?: string;
    SHADOWAVE_BROWSER_URL?: string;
    SHADOWAVE_TLS_CERT?: string;
    SHADOWAVE_TLS_KEY?: string;
  }
}

export {};
