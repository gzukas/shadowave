import { useAtom, useAtomValue } from "jotai";
import { sensibleDefaultsEffect } from "@/atoms/sensibleDefaultsEffect";
import { amplitudeAtom } from "@/atoms/amplitudeAtom";
import { rotationAtom } from "@/atoms/rotationAtom";
import { frequencyAtom } from "@/atoms/frequencyAtom";
import { imagesAtom } from "@/atoms/imagesAtom";
import { AtomSlider } from "./AtomSlider";
import { cn } from "@/lib/utils";

export type ControlsProp = React.ComponentPropsWithoutRef<"div">;

export function Controls(props: ControlsProp) {
  const { className, ...other } = props;
  const images = useAtomValue(imagesAtom);
  useAtom(sensibleDefaultsEffect);

  return (
    <div className={cn("space-y-6", className)} {...other}>
      <AtomSlider
        label="Rotation"
        atom={rotationAtom}
        min={0}
        max={360}
        disabled={!images.length}
      />
      <AtomSlider
        label="Frequency"
        atom={frequencyAtom}
        min={1}
        max={1000}
        disabled={!images.length}
      />
      <AtomSlider
        label="Amplitude"
        atom={amplitudeAtom}
        min={0}
        max={1000}
        disabled={!images.length}
      />
    </div>
  );
}
