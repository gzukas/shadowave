import React, { useId } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { cn } from '@workspace/ui/lib/utils';
import { waveAtom } from '@/atoms/waveAtom';
import { orderedImagesAtom } from '@/atoms/orderedImagesAtom';
import { rotationAtom } from '@/atoms/waveformAtoms';
import { largestImageAtom } from '@/atoms/largestImageAtom';
import { scaleAtom } from '@/atoms/scaleAtom';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import { Glow } from '@/components/Glow';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SVGAttributes<T> {
    transformOrigin?: string;
  }
}

export interface GraphicsProps extends React.ComponentProps<'div'> {
  /**
   * Alternative content to render when images are unavailable.
   */
  fallback?: React.ReactNode;

  /**
   * Props to be passed to the `<svg>` element.
   */
  svgProps?: Partial<Omit<React.ComponentProps<'svg'>, 'viewBox'>>;
}

export function Graphics(props: GraphicsProps) {
  const {
    fallback,
    svgProps: { style: svgStyle, className: svgClassName, ...svgOther } = {},
    ...other
  } = props;

  const setGraphics = useSetAtom(graphicsAtom);
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
  const rotationScale = 1 + Math.abs(Math.sin((rotation * Math.PI) / 180));

  return (
    <Glow {...other}>
      <svg
        ref={setGraphics}
        viewBox={`0 0 ${width} ${height}`}
        style={
          {
            '--Graphics-width': `${width}px`,
            '--Graphics-height': `${height}px`,
            ...svgStyle
          } as React.CSSProperties
        }
        className={cn(
          'h-full w-full',
          'transform-gpu will-change-transform',
          'max-h-(--Graphics-height) max-w-(--Graphics-width)',
          svgClassName
        )}
        {...svgOther}
      >
        <defs>
          <path id={waveId} d={wave} />
          {orderedImages.slice(0, -1).map((image, i) => (
            <clipPath
              key={image.id}
              id={waveId + (i + 1)}
              transform={`rotate(${rotation})`}
              transformOrigin="50% 50%"
            >
              <use
                href={`#${waveId}`}
                transform={`translate(0, ${((i + 1) * sectionHeight - height / 2) * rotationScale}) scale(${scale})`}
                transformOrigin="50% 50%"
              />
            </clipPath>
          ))}
        </defs>
        <g>
          {orderedImages.map((image, i) => (
            <image
              key={image.id}
              href={image.src}
              clipPath={i >= 1 ? `url(#${waveId}${i})` : undefined}
            />
          ))}
        </g>
      </svg>
    </Glow>
  );
}
