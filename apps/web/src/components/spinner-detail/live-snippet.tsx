"use client";

import { CodeBlock } from "@/components/code/code-block";
import { componentName, snippetLines } from "@/lib/code";
import type { SnippetPalette } from "@/lib/code-theme";
import { customizationProps } from "@/lib/customization";
import { DEFAULT_PREVIEW_SIZE } from "./preview-sizes";
import { useCustomization } from "./spinner-customization";

export function LiveSnippet({ palette }: { palette: SnippetPalette }) {
  const { customization, item } = useCustomization();
  const props = customizationProps(item, customization);
  const customized =
    props.size !== DEFAULT_PREVIEW_SIZE || Object.keys(props).length > 1;

  return (
    <CodeBlock
      event={{
        name: "Snippet Copied",
        properties: { customized, spinner: item.slug },
      }}
      lines={snippetLines(componentName(item.slug), props)}
      palette={palette}
    />
  );
}
