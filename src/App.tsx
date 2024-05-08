import { Trans } from '@lingui/macro';
import { siteConfig } from '@/config/site';
import { I18nProvider } from '@/components/I18nProvider';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { ChangeTheme } from '@/components/ChangeTheme';
import { useThemeEffect } from './hooks/useThemeEffect';
import { Editor } from './components/Editor';
import { JotaiDevTools } from './JotaiDevTools';

export function App() {
  useThemeEffect();

  return (
    <I18nProvider>
      <TooltipProvider>
        <main className="sm:container">
          <Editor />
        </main>
        <footer className="flex flex-col items-center justify-between gap-4 py-8 sm:container sm:flex-row">
          <p className="text-center text-sm text-muted-foreground ">
            <Trans>
              Built by{' '}
              <a href={siteConfig.links.author} target="_blank">
                gzukas
              </a>
              . The source code is available on{' '}
              <a href={siteConfig.links.github} target="_blank">
                GitHub
              </a>
              .
            </Trans>
          </p>
          <ChangeTheme />
        </footer>
        <JotaiDevTools />
      </TooltipProvider>
    </I18nProvider>
  );
}
