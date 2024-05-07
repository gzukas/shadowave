import { atom } from 'jotai';
import { amplitudeAtom } from './amplitudeAtoms';
import { largestImageAtom } from './largestImageAtom';
import { wavelengthAtom } from './wavelengthAtoms';

function round(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export const waveAtom = atom(async get => {
  const wavelength = get(wavelengthAtom);
  const amplitude = get(amplitudeAtom);
  const largestImage = await get(largestImageAtom);

  if (!largestImage) {
    return '';
  }

  const { width, height } = largestImage;
  const halfHeight = height / 2;
  const ys = [halfHeight];
  let py = halfHeight;

  for (let x = 0; x <= width; x++) {
    const y = amplitude * Math.sin((2 * Math.PI * x) / wavelength) + halfHeight;
    ys.push(round(y - py));
    py = y;
  }

  return `m0 ${ys.join(' 1 ')} V0H0Z`;
});
