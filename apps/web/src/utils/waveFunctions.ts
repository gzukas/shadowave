/**
 * {@inheritdoc Math.sin}
 */
export const sin = Math.sin;

/**
 * Calculates a "heartbeat" wave function.
 *
 * This function combines three sine waves with slightly different frequencies
 * and averages them, creating a more complex oscillating pattern.
 *
 * @param x - The input value measured in radians.
 */
export const heartbeat = (x: number) =>
  (Math.sin(x) + Math.sin(x * 1.1) + Math.sin(x * 1.9)) / 3;
