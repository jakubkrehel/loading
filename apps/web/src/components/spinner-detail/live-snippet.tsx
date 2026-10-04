"use client";

import { CodeBlock } from "@/components/code/code-block";
import { componentName, snippetLines } from "@/lib/code";
import type { SnippetPalette } from "@/lib/code-theme";
import { customizationProps, DEFAULT_PREVIEW_SIZE } from "@/lib/customization";
import { useCustomization } from "./spinner-customization";

// The palette comes from a server component so the theme JSON stays out of the client bundle.
export function LiveSnippet({ palette }: { palette: SnippetPalette }) {
  const { customization, item } = useCustomization();
  const props = customizationProps(item, customization);
  const customized =
    customization.opacity !== 100 ||
    props.size !== DEFAULT_PREVIEW_SIZE ||
    Object.keys(props).length > 1;

  return (
    <CodeBlock
      event={{
        name: "Snippet Copied",
        properties: { customized, spinner: item.slug },
      }}
      lines={snippetLines(
        componentName(item.slug),
        props,
        customization.opacity
      )}
      palette={palette}
    />
  );
}
