import { cn } from '@workspace/ui/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

type Keys = string;
type KeyDisplay = string | { other: string; macos: string };
type KeyDisplayMapping = Record<string, KeyDisplay>;

const defaultKeyDisplayMapping: KeyDisplayMapping = {
  meta: { other: 'Meta', macos: '⌘' },
  shift: '⇧',
  alt: { other: 'Alt', macos: '⌥' },
  ctrl: { other: 'Ctrl', macos: '⌃' },
  mod: { other: 'Ctrl', macos: '⌘' },
  arrowup: '↑',
  arrowdown: '↓'
};

const shortcutVariants = cva(
  'ml-auto hidden tracking-widest select-none sm:flex px-1 pointer-events-none gap-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: '',
        outline: 'rounded border bg-muted'
      },
      size: {
        default: '',
        sm: 'text-xs'
      }
    },

    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ShortcutOptions
  extends React.ComponentProps<'kbd'>,
    VariantProps<typeof shortcutVariants> {
  keys: Keys;
  keyComponent?: React.ElementType;
  keyDisplayMapping?: KeyDisplayMapping;
  combinationKey?: string;
  platform?: string;
}

export function Shortcut(props: ShortcutOptions) {
  const {
    keys,
    keyComponent: KeyComponent = 'span',
    keyDisplayMapping: keyDisplayMappingProp,
    combinationKey = '+',
    platform = navigator.platform,
    variant,
    size,
    className,
    ...other
  } = props;

  const isMac = platform.startsWith('Mac');
  const keyDisplayMapping = {
    ...defaultKeyDisplayMapping,
    ...keyDisplayMappingProp
  };

  return (
    <kbd
      className={cn(shortcutVariants({ variant, size, className }))}
      {...other}
    >
      {keys
        .trim()
        .split(combinationKey)
        .map(part => {
          const display = keyDisplayMapping[part.trim().toLowerCase()] || part;
          return (
            <KeyComponent key={part}>
              {typeof display === 'string'
                ? display
                : isMac
                  ? display.macos
                  : display.other}
            </KeyComponent>
          );
        })}
    </kbd>
  );
}
