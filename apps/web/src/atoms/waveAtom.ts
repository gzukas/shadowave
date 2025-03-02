import { atom } from 'jotai';
import { unwrappedLargestImageAtom } from '@/atoms/largestImageAtom';
import { waveFunctionAtom } from '@/atoms/waveFunctionAtom';
import { amplitudeAtom, wavelengthAtom } from '@/atoms/waveformAtoms';
import { sin, heartbeat } from '@/utils/waveFunctions';
import { WaveFunction } from '@/types';

function round(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

const waveFunctionMapping: Record<WaveFunction, (x: number) => number> = {
  sin,
  heartbeat
};

export const waveAtom = atom(get => {
  const largestImage = get(unwrappedLargestImageAtom);
  const wavelength = get(wavelengthAtom);
  const amplitude = get(amplitudeAtom);
  const waveFunction = waveFunctionMapping[get(waveFunctionAtom)];

  if (!largestImage) {
    return '';
  }

  const { width, height } = largestImage;
  const halfHeight = height / 2;
  let prevY = halfHeight;
  const ys = [prevY];

  for (let x = 0; x <= width; x++) {
    const y =
      amplitude * waveFunction((2 * Math.PI * x) / wavelength) + halfHeight;
    ys.push(round(y - prevY));
    prevY = y;
  }

  return `m0 ${ys.join(' 1 ')} V0H0Z`;
});
