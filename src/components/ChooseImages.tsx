import { useAtom } from "jotai";
import { Trans, Plural } from "@lingui/macro";
import { imagesAtom } from "@/atoms/imagesAtom";
import { Button, ButtonProps } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

export type ChooseImagesProps = Omit<ButtonProps, "asChild">;

export function ChooseImages(props: ChooseImagesProps) {
  const { className, ...other } = props;
  const [images, setImages] = useAtom(imagesAtom);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setImages(e.target.files ?? []);
  };

  return (
    <Button
      variant="secondary"
      className={cn("space-x-2", className)}
      asChild
      {...other}
    >
      <label role="button">
        <span className="flex-grow">
          <Trans>Choose Images</Trans>
        </span>
        {images.length ? (
          <>
            <Separator orientation="vertical" className="h-[20px]" />
            <span className="text-muted-foreground">
              <Plural value={images.length} one="# image" other="# images" />
            </span>
          </>
        ) : null}
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*"
          multiple
        />
      </label>
    </Button>
  );
}
