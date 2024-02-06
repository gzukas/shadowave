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
  const inputId = useId();

  return (
    <div className={cn('grid', 'gap-4', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor={inputId}>{label}</Label>
          <Input
            id={inputId}
            type="number"
            value={value}
            onChange={e => setValue(e.target.valueAsNumber)}
            className="h-6 w-auto rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground [appearance:textfield] hover:border-border [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            min={min}
            max={max}
            disabled={disabled}
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
