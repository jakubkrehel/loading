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

export function spinnerHtml(
  spinner: Element,
  css: string,
  opacity: number
): string {
  const markup =
    opacity === 100
      ? serialize(spinner, 0)
      : [
          `<div style="opacity: ${opacity}%">`,
          ...serialize(spinner, 1),
          "</div>",
        ];
  return [...stylesheet(css), "", ...markup].join("\n");
}

const ROOT_RULE = /(?=^\.ld-[\w-]+ \{\n {2}width: var\(--ld-size)/m;

export function spinnerCss(slug: string): string | undefined {
  const root = `.ld-${slug} {`;
  return [...document.querySelectorAll(`style[data-href~="ld-${slug}"]`)]
    .flatMap((style) => (style.textContent ?? "").split(ROOT_RULE))
    .find((chunk) => chunk.startsWith(root));
}
