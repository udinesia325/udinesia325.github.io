import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import App from "./App.tsx";

/** Build-time render of the full page (waits for lazy sections) for scripts/prerender.mjs. */
export async function render(): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <App />
    </StrictMode>,
    // Never outline big Suspense boundaries into a hidden <div id="S:0"> + $RC script:
    // non-JS crawlers would read the lazy sections as hidden, out-of-order content.
    { progressiveChunkSize: Infinity },
  );
  return new Response(prelude).text();
}
