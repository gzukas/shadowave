import { atom } from 'jotai';
import { frequencyAtom } from './frequencyAtom';
import { amplitudeAtom } from './amplitudeAtom';
import { largestImageAtom } from './largestImageAtom';

function round(n: number) {
  const f = Number(n.toFixed(2));
  return f > -1 && f < 1 ? String(f).replace(/^(-)?0\./, '$1.') : String(f);
}

export const waveAtom = atom(async get => {
  const frequency = get(frequencyAtom);
  const amplitude = get(amplitudeAtom);
  const largestImage = await get(largestImageAtom);

  if (!largestImage) {
    return '';
  }

  const { width, height } = largestImage;
  let d = '';
  let px = 0;
  let py = 0;

  for (let x = 0; x <= width; x++) {
    const y = height / 2 + amplitude * Math.sin(x / frequency);
    d += x ? `${round(x - px)} ${round(y - py)} ` : `m${round(x)} ${round(y)} `;
    px = x;
    py = y;
  }

  return `${d}V0H0Z`;
});
