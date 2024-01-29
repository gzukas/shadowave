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
  const id = useId();

  return (
    <div className={cn('grid', 'gap-4', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor={id}>{label}</Label>
          <Input
            type="number"
            value={value}
            onChange={e => setValue(e.target.valueAsNumber)}
            className="w-14 h-6 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
            min={min}
            max={max}
            disabled={disabled}
          />
        </div>
      )}
      <Slider
        id={id}
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
