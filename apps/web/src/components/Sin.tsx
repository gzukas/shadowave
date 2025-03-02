import { createGraphIcon } from '@/utils/createGraphIcon';
import { sin } from '@/utils/waveFunctions';

export const Sin = createGraphIcon('Sin', x => sin((x / 24) * 2 * Math.PI) * 8);
