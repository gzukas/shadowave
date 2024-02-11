import { atom } from 'jotai';
import { frequencyAtom } from './frequencyAtom';
import { amplitudeAtom } from './amplitudeAtom';
import { largestImageAtom } from './largestImageAtom';

function round(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export const waveAtom = atom(async get => {
  const frequency = get(frequencyAtom);
  const amplitude = get(amplitudeAtom);
  const largestImage = await get(largestImageAtom);

  if (!largestImage) {
    return '';
  }

  const { width, height } = largestImage;
  const halfHeight = height / 2;
  const ys = [halfHeight];
  let py = halfHeight;

  for (let x = 1; x <= width; x++) {
    const y = halfHeight + amplitude * Math.sin(x / frequency);
    ys.push(round(y - py));
    py = y;
  }

  return `m0 ${ys.join(' 1 ')} V0H0Z`;
});
