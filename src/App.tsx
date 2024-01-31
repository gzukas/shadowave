import { Suspense } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { Eclipse, Loader2 } from 'lucide-react';
import { Trans } from '@lingui/macro';
import { siteConfig } from '@/config/site';
import { filesOrLinksAtom } from '@/atoms/imagesAtom';
import { themeEffect } from '@/atoms/themeEffect';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Controls } from '@/components/Controls';
import { Graphics } from '@/components/Graphics';
import { Download } from '@/components/Download';
import { ChooseImages } from '@/components/ChooseImages';
import { I18nProvider } from '@/components/I18nProvider';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { ChangeTheme } from '@/components/ChangeTheme';
import { Button } from '@/components/ui/Button';
import { SeeExample } from '@/components/SeeExample';

export function App() {
  const filesOrLinks = useAtomValue(filesOrLinksAtom);
  useAtom(themeEffect);

  return (
    <I18nProvider>
      <TooltipProvider>
        <main className="container">
          <div className="grid md:grid-cols-[1fr_320px] overflow-hidden rounded-xl border shadow-md md:shadow-xl">
            <AspectRatio
              ratio={16 / 9}
              className="bg-muted flex justify-center items-center px-3 py-6"
            >
              {filesOrLinks.length ? (
                <Suspense
                  fallback={<Loader2 className="animate-spin h-12 w-12" />}
                >
                  <Graphics />
                </Suspense>
              ) : (
                <div className="flex flex-col gap-3 items-center lg:gap-6">
                  <Eclipse className="h-12 w-12 lg:h-24 lg:w-24" />
                  <h1 className="text-2xl lg:text-4xl">Shadowave</h1>
                  <p className="max-w-[350px] text-center">
                    <Trans>
                      Choose screenshots featuring both light and dark themes to
                      start waving.
                    </Trans>
                  </p>
                  <div className="flex gap-4">
                    <label htmlFor="image-files">
                      <Button variant="outline" asChild>
                        <div role="button">
                          <Trans>Choose Images</Trans>
                        </div>
                      </Button>
                    </label>
                    <SeeExample />
                  </div>
                </div>
              )}
            </AspectRatio>
            <div className="flex flex-col justify-between p-6 gap-8 border-l">
              <ChooseImages inputProps={{ id: 'image-files' }} />
              <Controls />
              <Download />
            </div>
          </div>
          <DevTools />
        </main>
        <footer className="container py-6 flex items-center justify-between">
          <p className="text-sm text-center text-muted-foreground">
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
