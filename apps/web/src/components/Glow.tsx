import { cn } from '@workspace/ui/lib/utils';

export type GlowProps = React.ComponentProps<'div'>;

export function Glow(props: GlowProps) {
  const { children, className, ...other } = props;
  return (
    <div
      className={cn(
        'relative',
        'before:animate-glow before:absolute before:top-[40%] before:left-0 before:h-full before:w-full',
        'before:bg-gradient-to-b',
        'before:[--tw-gradient-stops:var(--color-ring),var(--color-ring),transparent_40%]',
        'before:opacity-0',
        'before:blur-[180px]',
        className
      )}
      {...other}
    >
      {children}
    </div>
  );
}
