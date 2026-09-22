import { SPINNER_ITEMS } from "@/components/spinners";
import { componentName } from "@/lib/code";
import { DOMAIN, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export const dynamic = "force-static";

const INTRO = `\`\`\`sh
npm install loading-dev
\`\`\`

\`\`\`tsx
import { Arc } from "loading-dev";

<Arc size={16} />
\`\`\`

All indicators support \`size\`, \`color\` and \`duration\`. Some also expose additional controls like \`easing\`, \`cap\` or spinner-specific props.

The library exposes \`playState\` and you can customize any indicator with your own styles.

The spinners respect reduced motion out of the box and require React 19 or later.`;

function spinnerLine(item: (typeof SPINNER_ITEMS)[number]): string {
  return `- [${item.name}](${DOMAIN}${item.href}/markdown): ${item.description} Import as \`${componentName(item.slug)}\`.`;
}

export function GET() {
  const body = [
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    INTRO,
    "## Spinners",
    SPINNER_ITEMS.map(spinnerLine).join("\n"),
    "## Optional",
    [
      "- [GitHub](https://github.com/jakubkrehel/loading): Source and issues.",
      "- [npm](https://www.npmjs.com/package/loading-dev): The package itself.",
    ].join("\n"),
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
