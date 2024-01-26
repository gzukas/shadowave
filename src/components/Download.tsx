import clsx from "clsx";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Download as DownloadIcon, Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";
import { graphicsAtom } from "@/atoms/graphicsAtom";
import { rasterizeAtom, resterizingAtom } from "@/atoms/rasterAtoms";
import { downloadEffect } from "@/atoms/downloadEffect";

export type DownloadProps = ButtonProps;

export function Download(props: DownloadProps) {
  const graphics = useAtomValue(graphicsAtom);
  const rasterize = useSetAtom(rasterizeAtom);
  const isRasterizing = useAtomValue(resterizingAtom);
  useAtom(downloadEffect);

  const Icon = isRasterizing ? Loader2 : DownloadIcon;

  return (
    <Button
      onClick={rasterize}
      disabled={!graphics || isRasterizing}
      {...props}
    >
      <Icon
        className={clsx("mr-2", "w-4", "h-4", {
          "animate-spin": isRasterizing,
        })}
      />
      Download PNG
    </Button>
  );
}
