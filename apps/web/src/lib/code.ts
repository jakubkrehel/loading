import type * as Library from "loading-dev";
import type { SpinnerName, SpinnerProps } from "loading-dev";
import type { SpinnerOptions } from "@/components/spinners";

export type TokenKind =
  | "identifier"
  | "keyword"
  | "number"
  | "plain"
  | "string"
  | "tag";

export interface CodeToken {
  kind: TokenKind;
  text: string;
}

export type CodeLine = CodeToken[];

export type ElementProps = Partial<SpinnerProps & SpinnerOptions>;

const PRINT_WIDTH = 80;

const INDENT = "  ";

type PascalCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Capitalize<Head>}${PascalCase<Tail>}`
  : Capitalize<S>;

type ComponentNames = { [S in SpinnerName]: PascalCase<S> };

export type ComponentName = ComponentNames[SpinnerName];

({}) satisfies Record<Exclude<ComponentName, keyof typeof Library>, never>;

export function pascalCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function componentName(slug: SpinnerName): ComponentName {
  return pascalCase(slug) as ComponentName;
}

function token(kind: TokenKind, text: string): CodeToken {
  return { kind, text };
}

function indent(level: number, line: CodeLine): CodeLine {
  return [token("plain", INDENT.repeat(level)), ...line];
}

function attribute(name: string, value: number | string): CodeLine {
  const head = [token("identifier", name), token("keyword", "=")];
  return typeof value === "string"
    ? [...head, token("string", `"${value}"`)]
    : [
        ...head,
        token("plain", "{"),
        token("number", `${value}`),
        token("plain", "}"),
      ];
}

function attributes(props: ElementProps): CodeLine[] {
  return Object.entries(props)
    .filter(
      (entry): entry is [string, number | string] => entry[1] !== undefined
    )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => attribute(name, value));
}

function element(name: string, props: ElementProps): CodeLine {
  return [
    token("plain", "<"),
    token("tag", name),
    ...attributes(props).flatMap((line) => [token("plain", " "), ...line]),
    token("plain", " />"),
  ];
}

function width(line: CodeLine): number {
  return line.reduce((total, { text }) => total + text.length, 0);
}

function returned(name: ComponentName, props: ElementProps): CodeLine[] {
  const compact = indent(1, [
    token("keyword", "return"),
    token("plain", " "),
    ...element(name, props),
    token("plain", ";"),
  ]);
  if (width(compact) <= PRINT_WIDTH) {
    return [compact];
  }
  return [
    indent(1, [token("keyword", "return"), token("plain", " (")]),
    indent(2, [token("plain", "<"), token("tag", name)]),
    ...attributes(props).map((line) => indent(3, line)),
    indent(2, [token("plain", "/>")]),
    indent(1, [token("plain", ");")]),
  ];
}

function returnedRow(
  name: ComponentName,
  elements: ElementProps[],
  className: string
): CodeLine[] {
  return [
    indent(1, [token("keyword", "return"), token("plain", " (")]),
    indent(2, [
      token("plain", "<"),
      token("tag", "div"),
      token("plain", " "),
      ...attribute("className", className),
      token("plain", ">"),
    ]),
    ...elements.map((props) => indent(3, element(name, props))),
    indent(2, [token("plain", "</"), token("tag", "div"), token("plain", ">")]),
    indent(1, [token("plain", ");")]),
  ];
}

function merge(line: CodeLine): CodeLine {
  const merged: CodeLine = [];
  for (const current of line) {
    const last = merged.at(-1);
    if (last?.kind === current.kind) {
      last.text += current.text;
    } else {
      merged.push({ ...current });
    }
  }
  return merged;
}

export function exampleLines(
  name: ComponentName,
  suffix: string,
  elements: ElementProps[],
  rowClassName: string
): CodeLine[] {
  const [only, ...more] = elements;
  const body =
    more.length === 0
      ? returned(name, only)
      : returnedRow(name, elements, rowClassName);

  return [
    [
      token("keyword", "import"),
      token("plain", " { "),
      token("identifier", name),
      token("plain", " } "),
      token("keyword", "from"),
      token("plain", " "),
      token("string", '"loading-dev"'),
      token("plain", ";"),
    ],
    [],
    [
      token("keyword", "export"),
      token("plain", " "),
      token("keyword", "function"),
      token("plain", " "),
      token("identifier", `${name}${suffix}`),
      token("plain", "() {"),
    ],
    ...body,
    [token("plain", "}")],
  ].map(merge);
}

export function snippetLines(
  name: ComponentName,
  props: ElementProps
): CodeLine[] {
  return exampleLines(name, "Demo", [props], "");
}

export function codeText(lines: CodeLine[]): string {
  return lines.map((line) => line.map(({ text }) => text).join("")).join("\n");
}
