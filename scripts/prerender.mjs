// Injects the server-rendered app into dist/index.html so crawlers that don't run
// JS (AI search bots, link previews) still get the full page content.
import { readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const { render } = await import(pathToFileURL("dist-ssr/entry-server.js").href);
const html = await readFile("dist/index.html", "utf8");
if (!html.includes("<!--app-html-->")) throw new Error("dist/index.html is missing <!--app-html-->");

const app = await render();
await writeFile("dist/index.html", html.replace("<!--app-html-->", app));
await rm("dist-ssr", { recursive: true, force: true });
console.log(`prerendered dist/index.html (${(app.length / 1024).toFixed(1)} KB of markup)`);
