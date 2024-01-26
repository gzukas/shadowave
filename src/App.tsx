import { Suspense } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { DevTools } from "jotai-devtools";
import { Controls } from "@/components/Controls";
import { Preview } from "@/components/Preview";
import { Download } from "@/components/Download";
import { ChooseImages } from "@/components/ChooseImages";
import { I18n } from "@/components/I18n";
import { ReverseImages } from "@/components/ReverseImages";
import { TooltipProvider } from "@/components/ui/Tooltip";

export function App() {
  return (
    <I18n>
      <TooltipProvider>
        <div className="min-h-dvh flex flex-col justify-center items-center">
          <main className="container relative">
            <section className="overflow-hidden rounded-xl border shadow-md md:shadow-xl">
              <div className="grid md:grid-cols-[1fr_320px]">
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
            </section>
            <DevTools />
          </main>
          <footer className="container py-8">
            <p className="text-sm text-muted-foreground">
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
          </footer>
        </div>
      </TooltipProvider>
    </I18n>
  );
}
