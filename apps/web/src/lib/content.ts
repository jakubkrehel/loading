import { readFile } from "node:fs/promises";
import path from "node:path";
import type { SpinnerItem } from "@/lib/catalog";

const CONTENT_DIRECTORY = "src/content";

export function documentParts(item: SpinnerItem): string[] {
  return [
    "spinners/_shared",
    ...(item.options ?? []).map(({ prop }) => `options/${prop}`),
  ];
}

export function readContent(part: string): Promise<string> {
  return readFile(
    path.join(process.cwd(), CONTENT_DIRECTORY, `${part}.mdx`),
    "utf8"
  ).then((source) => source.trim());
}
