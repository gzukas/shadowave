import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Download as DownloadIcon, Loader2 } from "lucide-react";
import { Trans } from "@lingui/macro";
import { graphicsAtom } from "@/atoms/graphicsAtom";
import { rasterizeAtom, resterizingAtom } from "@/atoms/rasterAtoms";
import { downloadEffect } from "@/atoms/downloadEffect";
import { Button, ButtonProps } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type DownloadProps = ButtonProps;

export function Download(props: DownloadProps) {
  const graphics = useAtomValue(graphicsAtom);
  const rasterize = useSetAtom(rasterizeAtom);
  const isRasterizing = useAtomValue(resterizingAtom);
  const Icon = isRasterizing ? Loader2 : DownloadIcon;

  useAtom(downloadEffect);

  return (
    <Button
      onClick={rasterize}
      disabled={!graphics || isRasterizing}
      {...props}
    >
      <Icon
        className={cn("mr-2", "w-4", "h-4", {
          "animate-spin": isRasterizing,
        })}
      />
      <Trans>Download PNG</Trans>
    </Button>
  );
}
