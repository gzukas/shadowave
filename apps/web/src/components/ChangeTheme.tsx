import { useAtomValue, useSetAtom } from 'jotai';
import { Moon, Sun } from 'lucide-react';
import { useLingui } from '@lingui/react/macro';
import { Button } from '@workspace/ui/components/button';
import { resolvedThemeAtom, themeAtom } from '@/atoms/themeAtoms';

export type ChangeThemeProps = Omit<
  React.ComponentProps<typeof Button>,
  'onClick'
>;

export function ChangeTheme(props: ChangeThemeProps) {
  const { t } = useLingui();
  const setTheme = useSetAtom(themeAtom);
  const resolvedTheme = useAtomValue(resolvedThemeAtom);

  const handleThemeClick = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeClick}
      aria-label={t`Toggle theme`}
      {...props}
    >
      <Sun className="hidden [html.dark_&]:block" />
      <Moon className="hidden [html.light_&]:block" />
    </Button>
  );
}
