import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { atomWithExpire } from '@/utils/atomWithExpire';

export function useExpireAtom<T>(initialValue: T) {
  return useAtom(useMemo(() => atomWithExpire(initialValue), [initialValue]));
}
