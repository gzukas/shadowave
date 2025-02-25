import { Moon, Sun } from 'lucide-react';
import { useLingui } from '@lingui/react/macro';
import { Button } from '@workspace/ui/components/button';
import { useTheme } from '@/hooks/useTheme';

export type ChangeThemeProps = Omit<
  React.ComponentProps<typeof Button>,
  'onClick'
>;

export function ChangeTheme(props: ChangeThemeProps) {
  const { t } = useLingui();
  const [theme, setTheme] = useTheme();

  const handleThemeClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
