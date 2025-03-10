import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Separator } from '@workspace/ui/components/separator';
import { AppProvider } from '@/components/AppProvider';
import { ChangeTheme } from '@/components/ChangeTheme';
import { ChangeWaveFunction } from '@/components/ChangeWaveFunction';
import { CopyImage } from '@/components/CopyImage';
import { ExportImage } from '@/components/ExportImage';
import { Graphics } from '@/components/Graphics';
import { ImportImages } from '@/components/ImportImages';
import { NoImages } from '@/components/NoImages';
import { OptimizeWaveform } from '@/components/OptimizeWaveform';
import { RemoveImages } from '@/components/RemoveImages';
import { ReverseImages } from '@/components/ReverseImages';
import { Waveform } from '@/components/Waveform';

export function App() {
  return (
    <AppProvider>
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#fff_5%,transparent_80%)] select-none"></div>
      <div className="relative grid h-dvh w-dvw grid-rows-[auto_1fr_auto] overflow-hidden p-5">
        <header className="grid grid-cols-[1fr_2fr_1fr] items-center">
          <section className="col-start-2 justify-self-center">
            <div className="bg-card flex items-center rounded-md border p-1 shadow-xs sm:gap-1">
              <ImportImages variant="ghost" />
              <Separator orientation="vertical" className="h-4" />
              <OptimizeWaveform />
              <ChangeWaveFunction />
              <ReverseImages variant="ghost" />
              <Separator orientation="vertical" className="h-4" />
              <CopyImage />
              <ExportImage />
              <Separator orientation="vertical" className="h-4" />
              <RemoveImages variant="ghost" />
            </div>
          </section>
          <ChangeTheme className="justify-self-end" variant="outline" />
        </header>

        <main className="grid place-items-center p-5 md:p-16">
          <Suspense fallback={<Loader2 className="size-12 animate-spin" />}>
            <Graphics
              className="grid h-full place-items-center"
              fallback={<NoImages />}
            />
          </Suspense>
        </main>

        <footer className="pb-3 lg:pb-7">
          <section className="mx-auto grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-3">
            <Waveform />
          </section>
        </footer>
      </div>
    </AppProvider>
  );
}
