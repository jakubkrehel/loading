import GithubSlugger from "github-slugger";
import { getSpinner } from "@/lib/catalog";
import { documentParts, readContent } from "@/lib/content";
import { initialCustomization, snippet } from "@/lib/customization";
import { demoCode } from "@/lib/demos";

export interface DocumentHeading {
  id: string;
  label: string;
}

export interface SpinnerDocument {
  headings: DocumentHeading[];
  markdown: string;
}

const TOKEN = /^##\s+(.+?)\s*$|<Demo\s+name="([^"]+)"\s*\/>/gm;

function fence(code: string): string {
  return `\`\`\`tsx\n${code}\n\`\`\``;
}

export async function getSpinnerDocument(
  slug: string
): Promise<SpinnerDocument | null> {
  const item = getSpinner(slug);
  if (!item) {
    return null;
  }

  const sources = await Promise.all(documentParts(item).map(readContent));

  const slugger = new GithubSlugger();
  const headings: DocumentHeading[] = [];
  const sections = sources.map((source) =>
    source.replace(TOKEN, (match, label: string | undefined, demo: string) => {
      if (label === undefined) {
        return fence(demoCode(item, demo));
      }
      const id = slugger.slug(label);
      if (headings.some((heading) => heading.id === id)) {
        throw new Error(`Duplicate heading ID "${id}" in spinner "${slug}"`);
      }
      headings.push({ id, label });
      return match;
    })
  );

  return {
    headings,
    markdown: [
      `# ${item.name}`,
      item.description,
      fence(snippet(item, initialCustomization(item))),
      ...sections,
    ].join("\n\n"),
  };
}
