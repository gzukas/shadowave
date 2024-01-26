import { useAtom, useAtomValue } from "jotai";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { imageOrderAtom } from "@/atoms/imageOrderAtom";
import { Button } from "@/components/ui/Button";
import { imagesAtom } from "@/atoms/imagesAtom";

export function SetImageOrder() {
  const [imageOrder, setImageOrder] = useAtom(imageOrderAtom);
  const images = useAtomValue(imagesAtom);

  const Icon = imageOrder === "asc" ? ArrowDownUp : ArrowUpDown;

  const handleClick = () => {
    setImageOrder((order) => (order === "asc" ? "desc" : "asc"));
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleClick}
      disabled={!images?.length}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
}
