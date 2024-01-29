import { useSetAtom } from "jotai";
import { imagesAtom } from "@/atoms/imagesAtom";
import { Button, ButtonProps } from "@/components/ui/Button";

export type SeeExampleProps = Omit<ButtonProps, "onClick">;

export function SeeExample(props: SeeExampleProps) {
  const setImages = useSetAtom(imagesAtom);

  const handleClick = () => {
    setImages(["./dashboard-dark.webp", "./dashboard-light.webp"]);
  };

  return (
    <Button onClick={handleClick} variant="ghost" {...props}>
      See Example
    </Button>
  );
}
