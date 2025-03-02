import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';
import {
  ANY_OTHER_KEY,
  defaultKeyDisplayMapping,
  KeyDisplayMapping
} from '@/components/Shortcut/keyDisplayMappings';

const shortcutVariants = cva(
  'hidden select-none sm:flex pointer-events-none gap-1 text-muted-foreground font-mono',
  {
    variants: {
      variant: {
        default: '',
        outline: 'rounded border bg-muted'
      },
      size: {
        default: '',
        sm: 'text-xs px-1'
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
  keys: string;

  /**
   * The component used to render each individual key. Defaults to `span`.
   */
  keyComponent?: React.ElementType;

  /**
   * A mapping of key names to display values. Allows customization of key display based on the
   * operating system.
   *
   * The order of keys within `macos` and `other` determines the sorting order of the displayed keys.
   * Keys that are defined in the mapping will be sorted according to their position in the object.
   *
   * If a key is not found in the mapping, it will be treated as the "any" key. Keys that are not
   * found will be sorted based on their relative position to the "any" key in the mapping.
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
    keyDisplayMapping = defaultKeyDisplayMapping,
    combinationKey = '+',
    userAgent = navigator.userAgent,
    variant,
    size,
    className,
    ...other
  } = props;

  const platformKeyMapping = isMacOS(userAgent)
    ? keyDisplayMapping.macos
    : keyDisplayMapping.other;

  const platformKeys = Object.keys(platformKeyMapping);
  const sortedKeys = keys
    .trim()
    .split(combinationKey)
    .map(key => key.trim())
    .sort((a, b) => {
      const ai = platformKeys.indexOf(a.toLowerCase());
      const bi = platformKeys.indexOf(b.toLowerCase());

      const anyIndex = platformKeys.includes(ANY_OTHER_KEY)
        ? platformKeys.indexOf(ANY_OTHER_KEY)
        : Infinity;

      return (ai === -1 ? anyIndex : ai) - (bi === -1 ? anyIndex : bi);
    });

  return (
    <kbd
      className={cn(shortcutVariants({ variant, size, className }))}
      {...other}
    >
      {sortedKeys.map(key => (
        <KeyComponent key={key}>
          {platformKeyMapping[key.toLowerCase()] || key}
        </KeyComponent>
      ))}
    </kbd>
  );
}
