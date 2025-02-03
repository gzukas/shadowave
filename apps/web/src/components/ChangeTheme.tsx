import { Moon, Sun } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { Button } from '@workspace/ui/components/button';
import { useTheme } from '@/hooks/useTheme';

export function ChangeTheme() {
  const [appliedTheme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(appliedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={toggleTheme}
    >
      <Sun className="hidden [html.dark_&]:block" />
      <Moon className="hidden [html.light_&]:block" />
      <span className="sr-only">
        <Trans>Toggle theme</Trans>
      </span>
    </Button>
  );
}
