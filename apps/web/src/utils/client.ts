import { treaty } from '@elysiajs/eden';
import type { App } from '../../../api/src/index';

export const client = treaty<App>(import.meta.env.VITE_API_URL);

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
