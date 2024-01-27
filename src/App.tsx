import { Suspense } from "react";
import { useAtom } from 'jotai';
import { DevTools } from "jotai-devtools";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { themeEffect } from '@/atoms/themeEffect';
import { Controls } from "@/components/Controls";
import { Preview } from "@/components/Preview";
import { Download } from "@/components/Download";
import { ChooseImages } from "@/components/ChooseImages";
import { I18nProvider } from "@/components/I18nProvider";
import { ReverseImages } from "@/components/ReverseImages";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { ChangeTheme } from "@/components/ChangeTheme";

export function App() {
  useAtom(themeEffect);

  return (
    <I18nProvider>
      <TooltipProvider>
        <main className="container">
          <div className="grid md:grid-cols-[1fr_320px] overflow-hidden rounded-xl border shadow-md md:shadow-xl">
            <Suspense fallback="loading">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Preview />
              </AspectRatio>
              <div className="flex-col flex p-6 justify-between">
                <div className="flex space-x-2">
                  <ChooseImages className="flex-grow" />
                  <ReverseImages />
                </div>
                <Controls className="py-12 space-y-6" />
                <Download />
              </div>
            </Suspense>
          </div>
          <DevTools />
        </main>
        <footer className="container py-8 flex items-center justify-between">
          <p className="text-sm text-center text-muted-foreground">
            Built by{" "}
            <a href="https://github.com/gzukas" target="_blank">
              gzukas
            </a>
            . The source code is available on{" "}
            <a href="https://github.com/gzukas/mei" target="_blank">
              GitHub
            </a>
            .
          </p>
          <ChangeTheme />
        </footer>
      </TooltipProvider>
    </I18nProvider>
  );
}
