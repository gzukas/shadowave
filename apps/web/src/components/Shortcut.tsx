import { cn } from '@workspace/ui/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

type Keys = string;
export type KeyDisplay = string | { other: string; macos: string };
export type KeyDisplayMapping = Record<string, KeyDisplay>;

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

function isMacOS(userAgent: string) {
  return /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i.test(userAgent);
}

export interface ShortcutProps
  extends React.ComponentProps<'kbd'>,
    VariantProps<typeof shortcutVariants> {
  /**
   * The keys to render in the shortcut. Can be a single key or a combination of keys separated
   * by `combinationKey`.
   */
  keys: Keys;

  /**
   * The component used to render each individual key. Defaults to `span`.
   */
  keyComponent?: React.ElementType;

  /**
   * A mapping of key names to display values. Allows customization of key display based on the
   * operating system.
   */
  keyDisplayMapping?: KeyDisplayMapping;

  /**
   * THe string used to separate multiple keys in the `keys` prop. Defaults to `+`.
   */
  combinationKey?: string;

  /**
   * The user agent string used to determine the operating system. Defaults to `navigator.userAgent`.
   */
  userAgent?: string;
}

export function Shortcut(props: ShortcutProps) {
  const {
    keys,
    keyComponent: KeyComponent = 'span',
    keyDisplayMapping: keyDisplayMappingProp,
    combinationKey = '+',
    userAgent = navigator.userAgent,
    variant,
    size,
    className,
    ...other
  } = props;

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
                : isMacOS(userAgent)
                  ? display.macos
                  : display.other}
            </KeyComponent>
          );
        })}
    </kbd>
  );
}
