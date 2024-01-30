import { useId } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { cn } from '@/lib/utils';

export interface AtomSliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Slider>,
    'value' | 'onValueCHange'
  > {
  label?: React.ReactNode;
  atom: PrimitiveAtom<number>;
}

export function AtomSlider(props: AtomSliderProps) {
  const { label, atom, className, min, max, disabled, ...other } = props;
  const [value, setValue] = useAtom(atom);
  const labelId = useId();

  return (
    <div className={cn('grid', 'gap-4', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label id={labelId}>{label}</Label>
          <Input
            type="number"
            value={value}
            onChange={e => setValue(e.target.valueAsNumber)}
            className="w-auto h-6 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min={min}
            max={max}
            disabled={disabled}
            aria-labelledby={labelId}
          />
        </div>
      )}
      <Slider
        value={[value]}
        onValueChange={([v]) => setValue(v)}
        min={min}
        max={max}
        disabled={disabled}
        {...other}
      />
    </div>
  );
}
