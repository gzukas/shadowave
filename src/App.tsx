import { Suspense } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { DevTools } from "jotai-devtools";
import { Controls } from "@/components/Controls";
import { Preview } from "@/components/Preview";
import { Download } from "@/components/Download";
import { ChooseImages } from './components/ChooseImages';
import { SetImageOrder } from './components/SetImageOrder';

export function App() {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center">
      <main className="container relative">
        <section className="overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl">
          <div className="grid md:grid-cols-[1fr_280px]">
            <Suspense fallback="loading">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Preview />
              </AspectRatio>
              <div className="flex-col flex p-6 justify-between">
                <div className="flex space-x-2">
                  <ChooseImages className="flex-grow"/>
                  <SetImageOrder/>
                </div>
                <Controls className="py-12 space-y-6" />
                <Download/>
              </div>
            </Suspense>
          </div>
        </section>
        <DevTools />
      </main>
    </div>
  );
}
