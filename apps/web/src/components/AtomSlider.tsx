import { useId } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useHotkeys } from 'react-hotkeys-hook';
import { LabelProps } from '@radix-ui/react-label';
import { cn } from '@workspace/ui/lib/utils';
import { Label } from '@workspace/ui/components/label';
import { Slider } from '@workspace/ui/components/slider';
import { Shortcut, ShortcutProps } from '@/components/Shortcut/Shortcut';

export interface AtomSliderProps
  extends Omit<React.ComponentProps<typeof Slider>, 'value' | 'onValueChange'> {
  /**
   * The Jotai atom that reads and writes the slider value.
   */
  atom: PrimitiveAtom<number>;

  /**
   * The text or element to display as label.
   */
  label: React.ReactNode;

  /**
   * Optional props to pass to the `Label` component.
   */
  labelProps?: Partial<LabelProps>;

  /**
   * Optional props to pass to the `Shortcut` components.
   */
  shortcutProps?: Partial<ShortcutProps>;

  /**
   * Optional tuple containing keyboard shortcuts: one for incrementing and one for
   * decrementing the value.
   */
  hotkeys?: [incrementHotkey: string, decrementHotkey: string];

  /**
   * The amount to increase/decrease the value when using `hotkeys`. Unlike the `step`,
   * the `hotkeysStep` is typically larger to allow for faster value adjustments when
   * using keyboard shortcuts.
   */
  hotkeysStep?: number;
}

export function AtomSlider(props: AtomSliderProps) {
  const {
    atom,
    label,
    labelProps,
    shortcutProps,
    hotkeys = [],
    hotkeysStep = 1,
    min = 0,
    max = 100,
    ...other
  } = props;
  const [value, setValue] = useAtom(atom);
  const [incrementHotkey] = hotkeys;
  const labelId = useId();

  const handleValueChange = ([value]: number[]) => {
    setValue(value);
  };

  useHotkeys(
    hotkeys,
    (_, { hotkey }) => {
      setValue(value =>
        hotkey === incrementHotkey
          ? Math.min(max, value + hotkeysStep)
          : Math.max(min, value - hotkeysStep)
      );
    },
    { enabled: !!hotkeys.length && !other.disabled },
    [incrementHotkey, hotkeysStep]
  );

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <Label
          {...labelProps}
          id={labelId}
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
                {...shortcutProps}
              />
            ))}
          </div>
        )}
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        onValueChange={handleValueChange}
        aria-labelledby={labelId}
        {...other}
      />
    </div>
  );
}
