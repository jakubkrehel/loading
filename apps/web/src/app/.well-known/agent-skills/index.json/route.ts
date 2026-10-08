import { createHash } from "node:crypto";
import { DOMAIN } from "@/lib/constants";
import {
  SKILL_DESCRIPTION,
  SKILL_NAME,
  SKILL_PATH,
  skillMarkdown,
} from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  const digest = createHash("sha256").update(skillMarkdown()).digest("hex");

  return Response.json({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        description: SKILL_DESCRIPTION,
        digest: `sha256:${digest}`,
        name: SKILL_NAME,
        type: "skill-md",
        url: `${DOMAIN}${SKILL_PATH}`,
      },
    ],
  });
}
