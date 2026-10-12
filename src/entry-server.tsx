import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import App from "./App.tsx";

/** Build-time render of the full page (waits for lazy sections) for scripts/prerender.mjs. */
export async function render(): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  return new Response(prelude).text();
}
