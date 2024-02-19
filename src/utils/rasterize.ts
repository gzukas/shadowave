import { MIME_TYPES } from '@/constants';
import { loadImage } from './loadImage';

export interface RasterizeOptions {
  type?: string;
}

export async function rasterize(
  svg: SVGGraphicsElement,
  options: RasterizeOptions = {}
) {
  const { type = MIME_TYPES.png } = options;
  const svgString = new XMLSerializer().serializeToString(svg);
  const image = await loadImage(
    `data:${MIME_TYPES.svg};base64,${btoa(svgString)}`
  );
  return new Promise<Blob>((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const { width, height } = svg.getBBox();

    canvas.width = width;
    canvas.height = height;

    context!.drawImage(image, 0, 0, width, height);
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject();
      }
    }, type);
  });
}
