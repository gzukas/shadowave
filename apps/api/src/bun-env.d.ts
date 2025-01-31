declare module "bun" {
  interface Env {
    SHADOWAVE_HOST?: string;
    SHADOWAVE_PORT?: string;
    SHADOWAVE_CORS_ORIGIN?: string;
  }
}

export {};
