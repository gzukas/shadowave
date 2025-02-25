import { useAtom, WritableAtom } from 'jotai';
import { useHotkeys } from 'react-hotkeys-hook';
import { LabelProps } from '@radix-ui/react-label';
import { cn } from '@workspace/ui/lib/utils';
import { Label } from '@workspace/ui/components/label';
import { Slider } from '@workspace/ui/components/slider';
import { CountAction } from '@/utils/createCountReducer';
import { Shortcut } from '@/components/Shortcut';

export interface AtomSliderProps
  extends Omit<React.ComponentProps<typeof Slider>, 'value' | 'onValueChange'> {
  atom: WritableAtom<number, [CountAction], void>;
  label: React.ReactNode;
  labelProps?: Partial<LabelProps>;
  hotkeys?: [incrementHotkey: string, decrementHotkey: string];
}

export function AtomSlider(props: AtomSliderProps) {
  const { atom, className, label, labelProps, hotkeys = [], ...other } = props;
  const [value, dispatch] = useAtom(atom);
  const [incrementHotkey] = hotkeys;

  const handleValueChange = ([value]: number[]) => {
    dispatch({ type: 'CHANGE', value });
  };

  useHotkeys(
    hotkeys,
    (_, { hotkey }) => {
      dispatch({
        type: hotkey === incrementHotkey ? 'INCREMENT' : 'DECREMENT'
      });
    },
    { enabled: !!hotkeys.length && !other.disabled }
  );

  return (
    <div className={cn('grid gap-4', className)}>
      <div className="flex items-center justify-between">
        <Label
          {...labelProps}
          className={cn(
            { 'text-muted-foreground': other.disabled },
            labelProps?.className
          )}
        >
          {label}
        </Label>
        {hotkeys.length > 0 && (
          <div className="flex gap-1.5 text-right">
            {hotkeys.map(hotkey => (
              <Shortcut
                key={hotkey}
                keys={hotkey}
                variant="outline"
                size="sm"
              />
            ))}
          </div>
        )}
      </div>
      <Slider value={[value]} onValueChange={handleValueChange} {...other} />
    </div>
  );
}
