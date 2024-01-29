import { useSetAtom } from "jotai";
import { Trans } from "@lingui/macro";
import { imagesAtom } from "@/atoms/imagesAtom";
import { Button, ButtonProps } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export type SeeExampleProps = Omit<ButtonProps, "onClick">;

export function SeeExample(props: SeeExampleProps) {
  const setImages = useSetAtom(imagesAtom);

  const handleClick = () => {
    setImages(siteConfig.example);
  };

  return (
    <Button onClick={handleClick} variant="ghost" {...props}>
      <Trans>See Example</Trans>
    </Button>
  );
}
