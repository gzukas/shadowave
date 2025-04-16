import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { atomWithExpire } from '@/utils/atomWithExpire';

/**
 * A hook that creates an atom with an expiration mechanism. The atom's value will
 * be reset to `initialValue` after a specified timeout.
 *
 * @see {@link atomWithExpire}
 * @example
 * ```
 * const [state, setState] = useExpireAtom<boolean | null>(null)
 *
 * // Usage
 * setState(false) // false indefinitely
 * setState(true, 500) // true for 500ms, then reset it to null
 * ```
 *
 * @param initialValue - The initial value of the atom.
 */
export function useExpireAtom<T>(initialValue: T) {
  return useAtom(useMemo(() => atomWithExpire(initialValue), [initialValue]));
}
