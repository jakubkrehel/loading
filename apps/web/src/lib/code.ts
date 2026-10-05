import type * as Library from "loading-dev";
import type { SpinnerName, SpinnerProps } from "loading-dev";
import type { SpinnerOptions } from "@/lib/catalog";

export type ElementProps = Partial<SpinnerProps & SpinnerOptions>;

export const DEMO_ROW = "flex items-center gap-6";

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

function indent(level: number, line: string): string {
  return `${INDENT.repeat(level)}${line}`;
}

function attribute(name: string, value: number | string): string {
  return typeof value === "string"
    ? `${name}="${value}"`
    : `${name}={${value}}`;
}

function attributes(props: ElementProps): string[] {
  return Object.entries(props)
    .filter(
      (entry): entry is [string, number | string] => entry[1] !== undefined
    )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => attribute(name, value));
}

function element(name: string, props: ElementProps): string {
  return `<${[name, ...attributes(props)].join(" ")} />`;
}

function returned(name: ComponentName, props: ElementProps): string[] {
  const compact = indent(1, `return ${element(name, props)};`);
  if (compact.length <= PRINT_WIDTH) {
    return [compact];
  }
  return [
    indent(1, "return ("),
    indent(2, `<${name}`),
    ...attributes(props).map((line) => indent(3, line)),
    indent(2, "/>"),
    indent(1, ");"),
  ];
}

function returnedDiv(divAttribute: string, children: string[]): string[] {
  return [
    indent(1, "return ("),
    indent(2, `<div ${divAttribute}>`),
    ...children.map((child) => indent(3, child)),
    indent(2, "</div>"),
    indent(1, ");"),
  ];
}

function component(
  name: ComponentName,
  suffix: string,
  body: string[]
): string {
  return [
    `import { ${name} } from "loading-dev";`,
    "",
    `export function ${name}${suffix}() {`,
    ...body,
    "}",
  ].join("\n");
}

export function exampleCode(
  name: ComponentName,
  suffix: string,
  elements: ElementProps[]
): string {
  const [only, ...more] = elements;
  const body =
    more.length === 0
      ? returned(name, only)
      : returnedDiv(
          attribute("className", DEMO_ROW),
          elements.map((props) => element(name, props))
        );
  return component(name, suffix, body);
}

export function snippetCode(
  name: ComponentName,
  props: ElementProps,
  opacity = 100
): string {
  if (opacity === 100) {
    return exampleCode(name, "Demo", [props]);
  }
  return component(
    name,
    "Demo",
    returnedDiv(`style={{ opacity: ${opacity / 100} }}`, [element(name, props)])
  );
}
