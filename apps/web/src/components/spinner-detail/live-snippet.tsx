"use client";

import { CodeBlock } from "@/components/code/code-block";
import { componentName, snippetLines } from "@/lib/code";
import type { SnippetPalette } from "@/lib/code-theme";
import { customizationProps } from "@/lib/customization";
import { useCustomization } from "./spinner-customization";

export function LiveSnippet({ palette }: { palette: SnippetPalette }) {
  const { customization, item } = useCustomization();

  return (
    <CodeBlock
      lines={snippetLines(
        componentName(item.slug),
        customizationProps(item, customization)
      )}
      palette={palette}
    />
  );
}
