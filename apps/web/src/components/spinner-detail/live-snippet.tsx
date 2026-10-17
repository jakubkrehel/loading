"use client";

import { CodeBlock } from "@/components/code/code-block";
import { initialCustomization, snippet } from "@/lib/customization";
import { useCustomization } from "./spinner-customization";

export function LiveSnippet() {
  const { customization, item } = useCustomization();
  const code = snippet(item, customization);

  return (
    <CodeBlock
      code={code}
      event={{
        name: "Snippet Copied",
        properties: {
          customized: code !== snippet(item, initialCustomization(item)),
          spinner: item.slug,
        },
      }}
    />
  );
}
