import type { MetadataRoute } from "next";
import { SPINNER_ITEMS } from "@/lib/catalog";
import { DOMAIN } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: DOMAIN },
    ...SPINNER_ITEMS.map(({ href }) => ({ url: `${DOMAIN}${href}` })),
  ];
}
