import type { ThemedToken } from "shiki/core";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import tsx from "shiki/langs/tsx.mjs";
import dark from "./themes/loading-dev-dark-color-theme.json";
import light from "./themes/loading-dev-light-color-theme.json";

const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  langs: [tsx],
  themes: [
    { ...dark, type: "dark" },
    { ...light, type: "light" },
  ],
});

export function highlight(code: string): ThemedToken[][] {
  return highlighter.codeToTokens(code, {
    colorsRendering: "none",
    defaultColor: "light-dark()",
    lang: "tsx",
    themes: { dark: dark.name, light: light.name },
  }).tokens;
}
