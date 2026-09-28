import type { CSSProperties } from "react";
import type { TokenKind } from "@/lib/code";
import loadingDark from "./themes/loading-dev-dark-color-theme.json";
import loadingLight from "./themes/loading-dev-light-color-theme.json";

interface TokenColors {
  name: string;
  tokenColors: {
    scope?: string | string[];
    settings: { foreground?: string };
  }[];
}

const DARK: TokenColors = loadingDark;

const LIGHT: TokenColors = loadingLight;

type ThemedStyle = CSSProperties & {
  "--shiki-dark": string;
  "--shiki-light": string;
};

export type SnippetPalette = Record<TokenKind, ThemedStyle>;

const SCOPES: Record<TokenKind, string> = {
  identifier: "variable",
  keyword: "keyword",
  number: "constant.numeric",
  plain: "punctuation",
  string: "string",
  tag: "entity.name.tag",
};

function foreground(theme: TokenColors, scope: string): string {
  const rule = theme.tokenColors.find((candidate) =>
    [candidate.scope ?? []].flat().includes(scope)
  );
  const color = rule?.settings.foreground;
  if (!color) {
    throw new Error(`Code theme "${theme.name}" has no colour for "${scope}"`);
  }
  return color;
}

function palette(kind: TokenKind): ThemedStyle {
  const scope = SCOPES[kind];
  return {
    "--shiki-dark": foreground(DARK, scope),
    "--shiki-light": foreground(LIGHT, scope),
  };
}

export const SNIPPET_PALETTE: SnippetPalette = {
  identifier: palette("identifier"),
  keyword: palette("keyword"),
  number: palette("number"),
  plain: palette("plain"),
  string: palette("string"),
  tag: palette("tag"),
};
