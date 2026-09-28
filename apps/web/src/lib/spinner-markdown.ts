import GithubSlugger from "github-slugger";
import { getSpinner } from "@/components/spinners";
import {
  type CodeLine,
  codeText,
  componentName,
  snippetLines,
} from "@/lib/code";
import { readContent } from "@/lib/content";
import { customizationProps, initialCustomization } from "@/lib/customization";
import { demoLines } from "@/lib/demos";

export interface DocumentHeading {
  id: string;
  label: string;
}

export interface SpinnerDocument {
  headings: DocumentHeading[];
  markdown: string;
}

const TOKEN = /^##\s+(.+?)\s*$|<Demo\s+name="([^"]+)"\s*\/>/gm;

function fence(lines: CodeLine[]): string {
  return `\`\`\`tsx\n${codeText(lines)}\n\`\`\``;
}

export async function getSpinnerDocument(
  slug: string
): Promise<SpinnerDocument | null> {
  const item = getSpinner(slug);
  if (!item) {
    return null;
  }

  const sources = await Promise.all([
    readContent("spinners", "_shared.mdx"),
    ...(item.options ?? []).map((option) =>
      readContent("options", `${option.prop}.mdx`)
    ),
  ]);

  const slugger = new GithubSlugger();
  const headings: DocumentHeading[] = [];
  const sections = sources.map((source) =>
    source.replace(TOKEN, (match, label: string | undefined, demo: string) => {
      if (label === undefined) {
        return fence(demoLines(item.slug, demo));
      }
      const id = slugger.slug(label);
      if (headings.some((heading) => heading.id === id)) {
        throw new Error(`Duplicate heading ID "${id}" in spinner "${slug}"`);
      }
      headings.push({ id, label });
      return match;
    })
  );

  const snippet = fence(
    snippetLines(
      componentName(item.slug),
      customizationProps(item, initialCustomization(item))
    )
  );

  return {
    headings,
    markdown: [`# ${item.name}`, item.description, snippet, ...sections].join(
      "\n\n"
    ),
  };
}
