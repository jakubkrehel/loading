import { skillMarkdown } from "@/lib/llms";
import { textResponse } from "@/lib/text-response";

export const dynamic = "force-static";

export function GET() {
  return textResponse(skillMarkdown(), "markdown");
}
