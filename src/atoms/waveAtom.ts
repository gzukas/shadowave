import { atom } from "jotai";
import { frequencyAtom } from "./frequencyAtom";
import { amplitudeAtom } from "./amplitudeAtom";
import { largestImageAtom } from "./largestImageAtom";

export const waveAtom = atom(async (get) => {
  const frequency = get(frequencyAtom);
  const amplitude = get(amplitudeAtom);
  const largestImage = await get(largestImageAtom);

  if (!largestImage) {
    return [];
  }

  const { width, height } = largestImage;
  const path = [];

  for (let x = 0; x <= width; x++) {
    const y = height / 2 + amplitude * Math.sin(x / frequency);
    path.push((x == 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2));
  }
  path.push(`L${width},${0} L0,0`);

  return path;
});
