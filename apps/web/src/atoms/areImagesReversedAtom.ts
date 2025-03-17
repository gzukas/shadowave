import { createJSONStorage } from 'jotai/utils';
import { Type } from '@sinclair/typebox';
import { atomWithToggleAndStorage } from '@/utils/atomWithToggleAndStorage';
import { withStorageValidator } from '@/utils/withStorageValidator';

export const areImagesReversedAtom = atomWithToggleAndStorage(
  'areImagesReversed',
  false,
  withStorageValidator(Type.Boolean())(createJSONStorage()),
  { getOnInit: true }
);
