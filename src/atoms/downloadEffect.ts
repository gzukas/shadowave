import { atomEffect } from "jotai-effect";
import { rasterAtom } from "./rasterAtoms";

export const downloadEffect = atomEffect((get, set) => {
  const raster = get(rasterAtom);
  if (raster) {
    const downloadLink = document.createElement("a");
    downloadLink.href = raster;
    downloadLink.download = "shadowave.png";
    downloadLink.click();
    set(rasterAtom, null);
  }
});
