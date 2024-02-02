import { atom } from 'jotai';
import { frequencyAtom } from './frequencyAtom';
import { amplitudeAtom } from './amplitudeAtom';
import { largestImageAtom } from './largestImageAtom';

export const waveAtom = atom(async get => {
  const frequency = get(frequencyAtom);
  const amplitude = get(amplitudeAtom);
  const largestImage = await get(largestImageAtom);

  if (!largestImage) {
    return '';
  }

  const { width, height } = largestImage;
  const path: Array<[string, string]> = [];

  for (let x = 0; x <= width; x++) {
    const y = height / 2 + amplitude * Math.sin(x / frequency);
    path.push([x.toFixed(1), y.toFixed(1)]);
  }

  const [m, ...ls] = path;
  return `M${m}L${ls}V0H0Z`;
});
