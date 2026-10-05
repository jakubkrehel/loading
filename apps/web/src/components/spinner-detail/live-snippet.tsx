"use client";

import { CodeBlock } from "@/components/code/code-block";
import { componentName, snippetCode } from "@/lib/code";
import { customizationProps, DEFAULT_PREVIEW_SIZE } from "@/lib/customization";
import { useCustomization } from "./spinner-customization";

export function LiveSnippet() {
  const { customization, item } = useCustomization();
  const props = customizationProps(item, customization);
  const customized =
    customization.opacity !== 100 ||
    props.size !== DEFAULT_PREVIEW_SIZE ||
    Object.keys(props).length > 1;

  return (
    <CodeBlock
      code={snippetCode(componentName(item.slug), props, customization.opacity)}
      event={{
        name: "Snippet Copied",
        properties: { customized, spinner: item.slug },
      }}
    />
  );
}
