import { observe } from 'jotai-effect';
import { focusAtom } from 'jotai-optics';
import { atomWithStorage, createJSONStorage, RESET } from 'jotai/utils';
import { Type } from '@sinclair/typebox';
import { largestImageAtom } from '@/atoms/largestImageAtom';
import { withStorageValidator } from '@/utils/withStorageValidator';

export const MIN_ROTATION = 0;
export const MAX_ROTATION = 360;
export const MIN_WAVELENGTH = 9;
export const MIN_AMPLITUDE = 0;

const WaveformSchema = Type.Object({
  rotation: Type.Number(),
  wavelength: Type.Number(),
  wavelengthMax: Type.Number(),
  amplitude: Type.Number(),
  amplitudeMax: Type.Number(),
  _optimized: Type.Optional(Type.Boolean())
});

export type Waveform = typeof WaveformSchema.static;

export const waveformAtom = atomWithStorage<Waveform>(
  'waveform',
  {
    rotation: 0,
    wavelength: MIN_WAVELENGTH,
    amplitude: MIN_AMPLITUDE,
    wavelengthMax: MIN_WAVELENGTH + 1,
    amplitudeMax: MIN_AMPLITUDE + 1
  },
  withStorageValidator(WaveformSchema)(createJSONStorage()),
  { getOnInit: true }
);

export const isWaveformOptimizedAtom = focusAtom(waveformAtom, optic =>
  optic.prop('_optimized')
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

observe((get, set) => {
  const abortController = new AbortController();
  const largestImagePromise = get(largestImageAtom);
  const isOptimized = get(isWaveformOptimizedAtom);

  (async () => {
    const largestImage = await largestImagePromise;
    if (abortController.signal.aborted) {
      return;
    }
    if (!largestImage) {
      set(waveformAtom, RESET);
      return;
    }
    if (isOptimized) {
      return;
    }
    const { width, height } = largestImage;
    const wavelengthMax = width;
    const amplitudeMax = Math.round(height / 8);

    set(waveformAtom, prev => ({
      ...prev,
      rotation: 0,
      wavelength: wavelengthMax,
      amplitude: amplitudeMax,
      wavelengthMax,
      amplitudeMax,
      _optimized: true
    }));
  })();

  return () => abortController.abort();
});
