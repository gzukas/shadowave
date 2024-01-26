import React, { useId } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { waveAtom } from "@/atoms/waveAtom";
import { sortedImagesAtom } from "@/atoms/sortedImagesAtom";
import { rotationAtom } from "@/atoms/rotationAtom";
import { largestImageAtom } from "@/atoms/largestImageAtom";
import { graphicsAtom } from "@/atoms/graphicsAtom";

export type PreviewProps = React.ComponentPropsWithoutRef<"svg">;

export function Preview(props: PreviewProps) {
  const wave = useAtomValue(waveAtom);
  const sortedImages = useAtomValue(sortedImagesAtom);
  const largestImage = useAtomValue(largestImageAtom);
  const rotation = useAtomValue(rotationAtom);
  const setGraphics = useSetAtom(graphicsAtom);

  const maskId = useId();

  return (
    largestImage && (
      <svg
        ref={setGraphics}
        viewBox={`0 0 ${largestImage?.width} ${largestImage?.height}`}
        width="100%"
        height="100%"
        {...props}
      >
        <defs>
          <clipPath
            id={maskId}
            transform={`rotate(-${rotation}) scale(2)`}
            transform-origin={`${largestImage.width / 2} ${
              largestImage.height / 2
            }`}
          >
            <path d={`${wave.join(" ")}`} />
          </clipPath>
        </defs>
        {sortedImages.map((image, index) => (
          <image
            key={image.id}
            xlinkHref={image.src}
            {...(index === sortedImages.length - 1 && {
              clipPath: `url(#${maskId})`,
            })}
          />
        ))}
      </svg>
    )
  );
}
