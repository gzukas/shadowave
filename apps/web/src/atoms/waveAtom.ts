import { atom } from 'jotai';
import { amplitudeAtom } from '@/atoms/amplitudeAtoms';
import { largestImageAtom } from '@/atoms/largestImageAtom';
import { wavelengthAtom } from '@/atoms/wavelengthAtoms';
import { waveFunctionAtom } from '@/atoms/waveFunctionAtom';
import { WaveFunction } from '@/types';

function round(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

const waveFunctionMapping: Record<WaveFunction, (x: number) => number> = {
  sin: Math.sin,
  cos: Math.cos
}

export const waveAtom = atom(get => {
  const wavelength = get(wavelengthAtom);
  const amplitude = get(amplitudeAtom);
  const largestImage = get(largestImageAtom);
  const waveFunction = waveFunctionMapping[get(waveFunctionAtom)];

  if (!largestImage) {
    return '';
  }

  const { width, height } = largestImage;
  const halfHeight = height / 2;
  const ys = [halfHeight];
  let py = halfHeight;

  for (let x = 0; x <= width; x++) {
    const y = amplitude * waveFunction((2 * Math.PI * x) / wavelength) + halfHeight;
    ys.push(round(y - py));
    py = y;
  }

  return `m0 ${ys.join(' 1 ')} V0H0Z`;
});
