import type { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      other: {
        "Content-Signal": "search=yes, ai-input=yes, ai-train=yes",
      },
      userAgent: "*",
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
