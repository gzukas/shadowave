import { PrimitiveAtom, useAtom } from 'jotai';
import { LabelProps } from '@radix-ui/react-label';
import { cn } from '@workspace/ui/lib/utils';
import { Label } from '@workspace/ui/components/label';
import { Slider } from '@workspace/ui/components/slider';

export interface AtomSliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Slider>,
    'value' | 'onValueCHange'
  > {
  atom: PrimitiveAtom<number>;
  label: React.ReactNode;
  LabelProps?: Partial<LabelProps>;
  renderValue?: (value: number) => React.ReactNode;
}

export function AtomSlider(props: AtomSliderProps) {
  const {
    atom,
    className,
    label,
    LabelProps,
    renderValue = value => value,
    ...other
  } = props;
  const [value, setValue] = useAtom(atom);
  return (
    <div className={cn('grid gap-4', className)}>
      <div className="flex items-center justify-between">
        <Label {...LabelProps}>{label}</Label>
        <span className="text-right text-sm text-muted-foreground">
          {renderValue(value)}
        </span>
      </div>
      <Slider value={[value]} onValueChange={([v]) => setValue(v)} {...other} />
    </div>
  );
}
