export const sin = Math.sin;

export const heartbeat = (x: number) =>
  (Math.sin(x) + Math.sin(x * 1.1) + Math.sin(x * 1.9)) / 3;
