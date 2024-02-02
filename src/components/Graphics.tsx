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

  const wave = useAtomValue(waveAtom);
  const orderedImages = useAtomValue(orderedImagesAtom);
  const largestImage = useAtomValue(largestImageAtom);
  const rotation = useAtomValue(rotationAtom);
  const setGraphics = useSetAtom(graphicsAtom);
  const scale = useAtomValue(scaleAtom);

  const maskId = useId();

  return largestImage ? (
    <svg
      ref={setGraphics}
      viewBox={`0 0 ${largestImage.width} ${largestImage.height}`}
      width="100%"
      height="100%"
      {...other}
    >
      <defs>
        <clipPath
          id={maskId}
          transform={`rotate(${rotation}) scale(${scale})`}
          transform-origin="50% 50%"
        >
          <path d={wave} />
        </clipPath>
      </defs>
      {orderedImages.map((image, index) => (
        <image
          key={image.id}
          href={image.src}
          {...(index === orderedImages.length - 1 && {
            clipPath: `url(#${maskId})`
          })}
        />
      ))}
    </svg>
  ) : (
    <>{fallback}</>
  );
}
