import { treaty } from '@elysiajs/eden';
import type { App } from '../../../api/src/index';

export const client = treaty<App>(import.meta.env.VITE_API_URL);

export function isValidationError(
  error: unknown
): error is { property?: string; message?: string } {
  return (
    !!error &&
    typeof error === 'object' &&
    'type' in error &&
    error.type === 'validation'
  );
}
