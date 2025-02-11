import { atomWithToggleAndStorage } from '@/utils/atomWithToggleAndStorage';

export const areImagesReversedAtom = atomWithToggleAndStorage(
  'areImagesReversed',
  false,
  undefined,
  { getOnInit: true }
);
