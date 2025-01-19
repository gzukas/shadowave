import { DevTools } from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';

export function JotaiDevTools() {
  return process.env.NODE_ENV !== 'production' ? (
    <>
      <style>{css}</style>
      <DevTools />
    </>
  ) : null;
}
