import { siteMarkdown } from "@/lib/llms";
import { textResponse } from "@/lib/text-response";

export const dynamic = "force-static";

export function GET() {
  return textResponse(siteMarkdown(), "markdown");
}
