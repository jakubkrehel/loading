"use client";

import { SPINNERS } from "loading-dev";
import { useEffect, useRef, useState } from "react";
import { CodeBlock } from "@/components/code/code-block";
import {
  customizationProps,
  initialCustomization,
  snippet,
} from "@/lib/customization";
import { spinnerCss, spinnerHtml } from "@/lib/html";
import { cn } from "@/lib/utils";
import { useCustomization } from "./spinner-customization";

const FORMATS = [
  { label: "React", value: "react" },
  { label: "HTML", value: "html" },
] as const;

type Format = (typeof FORMATS)[number]["value"];

export function LiveSnippet() {
  const { customization, item } = useCustomization();
  const [format, setFormat] = useState<Format>("react");
  const [html, setHtml] = useState("");
  const source = useRef<HTMLDivElement>(null);
  const Spinner = SPINNERS[item.slug];
  const react = snippet(item, customization);

  useEffect(() => {
    const spinner = source.current?.firstElementChild;
    const css = spinnerCss(item.slug);
    if (spinner && css) {
      setHtml(spinnerHtml(spinner, css, customization.opacity));
    }
  }, [customization, item.slug]);

  const code = format === "html" && html ? html : react;

  return (
    <div className="relative">
      <div hidden ref={source}>
        <Spinner {...customizationProps(item, customization)} />
      </div>
      <fieldset
        aria-label="Snippet format"
        className="absolute top-2 right-11 z-10 flex items-center gap-0.5"
      >
        {FORMATS.map((option) => (
          <label
            className={cn(
              "flex h-7 cursor-pointer select-none items-center rounded-md px-2 font-medium text-xs transition-colors duration-200 ease-out has-focus-visible:outline-2 has-focus-visible:outline-content has-focus-visible:outline-offset-2",
              format === option.value
                ? "bg-background text-content"
                : "text-content-subtle hover-hover:hover:text-content"
            )}
            key={option.value}
          >
            <input
              checked={format === option.value}
              className="sr-only"
              name="snippet-format"
              onChange={() => setFormat(option.value)}
              type="radio"
              value={option.value}
            />
            {option.label}
          </label>
        ))}
      </fieldset>
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
