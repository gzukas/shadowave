import { useSetAtom } from "jotai";
import { Button, ButtonProps } from "./ui/Button";
import { imagesAtom } from "@/atoms/imagesAtom";

export type ChooseImagesProps = Omit<ButtonProps, "asChild">;

export function ChooseImages(props: ChooseImagesProps) {
  const setImages = useSetAtom(imagesAtom);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setImages(e.target.files);
  };

  return (
    <Button variant="secondary" asChild {...props}>
      <label className="cursor-pointer">
        Choose Images
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          multiple
        />
      </label>
    </Button>
  );
}
