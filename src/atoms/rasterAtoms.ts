import { atom } from "jotai";
import { graphicsAtom } from "./graphicsAtom";
import { loadImage } from "@/utils/loadImage";

export const resterizingAtom = atom(false);
export const rasterAtom = atom<string | null>(null);

export const rasterizeAtom = atom(null, async (get, set) => {
  const graphics = get(graphicsAtom);
  if (!graphics) {
    return;
  }
  
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const { width, height } = graphics.getBBox();

  canvas.width = width;
  canvas.height = height;

  set(resterizingAtom, true);

  const svgString = new XMLSerializer().serializeToString(graphics);
  const image = await loadImage(`data:image/svg+xml;base64,${btoa(svgString)}`);

  context!.drawImage(image, 0, 0);

  set(rasterAtom, canvas.toDataURL("image/png"));
  set(resterizingAtom, false);
});
