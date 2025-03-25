import { treaty } from '@elysiajs/eden';
import type { App } from '../../../api/src/index';

export const client = treaty<App>(import.meta.env.VITE_API_URL);

/**
 * Type guard function to check if an `error` is a validation error.
 *
 * @param error - The error object to check.
 */
export function isValidationError(
  error: unknown
): error is { path?: string; message?: string } {
  return (
    !!error &&
    typeof error === 'object' &&
    'type' in error &&
    typeof error.type === 'number'
  );
}
