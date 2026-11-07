"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code/code-block";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { initialCustomization, snippet } from "@/lib/customization";
import { htmlSnippet } from "@/lib/html";
import { useCustomization } from "./spinner-customization";

const FORMATS = [
  { label: "React", value: "react" },
  { label: "HTML", value: "html" },
] as const;

type Format = (typeof FORMATS)[number]["value"];

export function LiveSnippet() {
  const { customization, item } = useCustomization();
  const [format, setFormat] = useState<Format>("react");
  const react = snippet(item, customization);
  const code = format === "html" ? htmlSnippet(item, customization) : react;

  return (
    <div className="relative">
      <div className="absolute top-2 right-11 z-10">
        <SegmentedControl
          label="Snippet format"
          onValueChange={setFormat}
          options={FORMATS}
          size="sm"
          value={format}
        />
      </div>
      <CodeBlock
        code={code}
        event={{
          name: "Snippet Copied",
          properties: {
            customized: react !== snippet(item, initialCustomization(item)),
            format,
            spinner: item.slug,
          },
        }}
      />
    </div>
  );
}
