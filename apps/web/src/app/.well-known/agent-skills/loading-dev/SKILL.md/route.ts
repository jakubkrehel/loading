import { skillMarkdown } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(skillMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
