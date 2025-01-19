import React, { useId } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { waveAtom } from '@/atoms/waveAtom';
import { orderedImagesAtom } from '@/atoms/orderedImagesAtom';
import { rotationAtom } from '@/atoms/rotationAtom';
import { largestImageAtom } from '@/atoms/largestImageAtom';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import { scaleAtom } from '@/atoms/scaleAtom';

export interface GraphicsProps extends React.ComponentPropsWithoutRef<'svg'> {
  fallback?: React.ReactNode;
}

export function Graphics(props: GraphicsProps) {
  const { fallback, ...other } = props;

  const orderedImages = useAtomValue(orderedImagesAtom);
  const wave = useAtomValue(waveAtom);
  const largestImage = useAtomValue(largestImageAtom);
  const setGraphics = useSetAtom(graphicsAtom);
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
      ref={setGraphics}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      {...other}
    >
      <defs>
        <path id={waveId} d={wave} />
        {orderedImages.map(
          (_, i) =>
            i !== orderedImages.length - 1 && (
              <clipPath
                key={i}
                id={waveId + (i + 1)}
                transform={`rotate(${rotation})`}
                transform-origin="50% 50%"
              >
                <use
                  href={`#${waveId}`}
                  transform={`translate(0, ${((i + 1) * sectionHeight - height / 2) * sectionRotationScale}) scale(${scale})`}
                  transform-origin="50% 50%"
                />
              </clipPath>
            )
        )}
      </defs>

      {orderedImages.map((image, index) => (
        <image
          key={image.id}
          href={image.src}
          {...(index >= 1 && {
            clipPath: `url(#${waveId}${orderedImages.length - index})`
          })}
        />
      ))}
    </svg>
  );
}
