import { Trans } from '@lingui/react/macro';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { siteConfig } from '@/config/site';
import { I18nProvider } from '@/components/I18nProvider';
import { ChangeTheme } from '@/components/ChangeTheme';
import { Editor } from '@/components/Editor';

export function App() {
  return (
    <I18nProvider>
      <TooltipProvider>
        <main className="sm:container">
          <Editor />
        </main>
        <footer className="flex flex-col items-center justify-between gap-4 py-8 sm:container sm:flex-row">
          <p className="text-muted-foreground text-center text-sm">
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
      </TooltipProvider>
    </I18nProvider>
  );
}
