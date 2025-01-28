import { resetAtom } from '@/atoms/resetAtom';
import { Button } from '@workspace/ui/components/button';
import { useAtom } from 'jotai';
import { RotateCw } from 'lucide-react';

export function Reset() {
  const [canReset, reset] = useAtom(resetAtom);
  return (
    <Button size="icon" variant="ghost" onClick={reset} disabled={!canReset} className="group">
      <RotateCw className="group-active:rotate-45"/>
    </Button>
  );
}
