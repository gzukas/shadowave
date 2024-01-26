import { atomEffect } from "jotai-effect";
import { rasterAtom } from "./rasterAtoms";

export const downloadEffect = atomEffect((get, set) => {
  const previewRaster = get(rasterAtom);
  if (previewRaster) {
    const downloadLink = document.createElement("a");
    downloadLink.href = previewRaster;
    downloadLink.download = "output.png";
    downloadLink.click();
    set(rasterAtom, null);
  }
});
