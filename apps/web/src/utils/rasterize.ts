import { MIME_TYPES } from '@/constants';
import { loadImage } from '@/utils/loadImage';

export interface RasterizeOptions {
  type?: string;
}

export async function rasterize(
  svg: SVGGraphicsElement,
  options: RasterizeOptions = {}
) {
  const { type = MIME_TYPES.png } = options;
  const svgString = new XMLSerializer().serializeToString(svg);
  const encodedSvg = encodeURIComponent(svgString).replace(/'/g, '%27');
  const dataUrl = `data:${MIME_TYPES.svg},${encodedSvg}`;

  try {
    const image = await loadImage(dataUrl);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to get 2D context from canvas');
    }

    const { width, height } = svg.getBBox();
    canvas.width = width;
    canvas.height = height;

    context.drawImage(image, 0, 0, width, height);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      }, type);
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
