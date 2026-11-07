import { SPINNERS } from "loading-dev";
import { renderToStaticMarkup } from "react-dom/server";
import type { SpinnerItem } from "@/lib/catalog";
import { type Customization, customizationProps } from "@/lib/customization";

const INDENT = "  ";

function openingTag(element: Element): string {
  const attributes = [...element.attributes].map(
    ({ name, value }) => `${name}="${value.replaceAll('"', "&quot;")}"`
  );
  return `<${[element.localName, ...attributes].join(" ")}`;
}

function serialize(element: Element, depth: number): string[] {
  const indent = INDENT.repeat(depth);
  const open = openingTag(element);
  const children = [...element.children];
  if (children.length === 0) {
    return [`${indent}${open}></${element.localName}>`];
  }
  return [
    `${indent}${open}>`,
    ...children.flatMap((child) => serialize(child, depth + 1)),
    `${indent}</${element.localName}>`,
  ];
}

function stylesheet(css: string): string[] {
  const rules = css
    .trim()
    .split("\n")
    .filter((line, index, lines) => line.trim() || lines[index - 1]?.trim());
  return [
    "<style>",
    ...rules.map((line) => (line ? `${INDENT}${line}` : line)),
    "</style>",
  ];
}

export function htmlSnippet(
  item: SpinnerItem,
  customization: Customization
): string {
  const Spinner = SPINNERS[item.slug];
  const template = document.createElement("template");
  template.innerHTML = renderToStaticMarkup(
    <Spinner {...customizationProps(item, customization)} />
  );
  const [style, spinner] = template.content.children;
  const { opacity } = customization;
  const markup =
    opacity === 100
      ? serialize(spinner, 0)
      : [
          `<div style="opacity: ${opacity}%">`,
          ...serialize(spinner, 1),
          "</div>",
        ];
  return [...stylesheet(style.textContent ?? ""), "", ...markup].join("\n");
}
