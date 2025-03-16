import { createGraphIcon } from '@/utils/createGraphIcon';
import { heartbeat } from '@/utils/waveFunctions';

export const Heartbeat = createGraphIcon('Heartbeat', x => heartbeat(x) * 8);
