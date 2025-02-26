import { atom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { atomWithStorage } from 'jotai/utils';

export const MIN_ROTATION = 0;
export const MAX_ROTATION = 360;
export const MIN_WAVELENGTH = 9;
export const MIN_AMPLITUDE = 0;

export interface Waveform {
  rotation: number;
  wavelength: number;
  wavelengthMax: number;
  amplitude: number;
  amplitudeMax: number;
}

export const waveformAtom = atomWithStorage<Waveform>(
  'waveform',
  {
    rotation: 0,
    wavelength: MIN_WAVELENGTH,
    amplitude: MIN_AMPLITUDE,
    wavelengthMax: MIN_WAVELENGTH + 1,
    amplitudeMax: MIN_AMPLITUDE + 1
  },
  undefined,
  { getOnInit: true }
);

// Rotation

export const rotationAtom = focusAtom(waveformAtom, optic =>
  optic.prop('rotation')
);

// Wavelength

export const wavelengthAtom = focusAtom(waveformAtom, optic =>
  optic.prop('wavelength')
);

export const wavelengthMaxAtom = focusAtom(waveformAtom, optic =>
  optic.prop('wavelengthMax')
);

// Amplitude

export const amplitudeAtom = focusAtom(waveformAtom, optic =>
  optic.prop('amplitude')
);

export const amplitudeMaxAtom = focusAtom(waveformAtom, optic =>
  optic.prop('amplitudeMax')
);

export const optimizeWaveformAtom = atom(
  null,
  (_get, set, image?: HTMLImageElement) => {
    const wavelengthMax = image?.width ?? MIN_WAVELENGTH + 1;
    const amplitudeMax = image
      ? Math.round(image.height / 8)
      : MIN_AMPLITUDE + 1;

    set(waveformAtom, {
      rotation: 0,
      wavelength: wavelengthMax,
      amplitude: amplitudeMax,
      wavelengthMax,
      amplitudeMax
    });
  }
);
