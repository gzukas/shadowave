import React, { useId } from 'react';
import { useAtomValue } from 'jotai';
import { waveAtom } from '@/atoms/waveAtom';
import { orderedImagesAtom } from '@/atoms/orderedImagesAtom';
import { rotationAtom } from '@/atoms/waveformAtoms';
import { largestImageAtom } from '@/atoms/largestImageAtom';
import { scaleAtom } from '@/atoms/scaleAtom';

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SVGAttributes<T> {
    transformOrigin?: string | undefined;
  }
}

export interface GraphicsProps extends React.ComponentPropsWithoutRef<'svg'> {
  fallback?: React.ReactNode;
  ref?: React.Ref<SVGSVGElement>;
}

export function Graphics(props: GraphicsProps) {
  const { fallback, ref, ...other } = props;

  const orderedImages = useAtomValue(orderedImagesAtom);
  const wave = useAtomValue(waveAtom);
  const largestImage = useAtomValue(largestImageAtom);
  const rotation = useAtomValue(rotationAtom);
  const scale = useAtomValue(scaleAtom);
  const waveId = useId();

  if (!largestImage) {
    return fallback;
  }

  const { width, height } = largestImage;
  const sectionHeight = height / orderedImages.length;
  const sectionRotationScale =
    1 + Math.abs(Math.sin((rotation * Math.PI) / 180));

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      {...other}
    >
      <defs>
        <path id={waveId} d={wave}/>
        {orderedImages.map(
          (image, i) =>
            i !== orderedImages.length - 1 && (
              <clipPath
                key={image.id}
                id={waveId + (i + 1)}
                transform={`rotate(${rotation})`}
                transformOrigin="50% 50%"
              >
                <use
                  href={`#${waveId}`}
                  transform={`translate(0, ${((i + 1) * sectionHeight - height / 2) * sectionRotationScale}) scale(${scale})`}
                  transformOrigin="50% 50%"
                />
              </clipPath>
            )
        )}
      </defs>

      {orderedImages.map((image, i) => (
        <image
          key={image.id}
          href={image.src}
          {...(i >= 1 && {
            clipPath: `url(#${waveId}${orderedImages.length - i})`
          })}
        />
      ))}
    </svg>
  );
}
