import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { ComponentType } from "react";
import { MarkdownIcon } from "@/icons/markdown-icon";
import { NpmIcon } from "@/icons/npm-icon";
import { SPINNER_ITEMS } from "@/lib/catalog";

export const GO_TO_KEY = "G";

export interface NavLink {
  href: string;
  keywords?: string[];
  label: string;
  shortcut?: string;
}

export interface SocialLink {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

export const TOP_LEVEL_NAV: NavLink[] = [
  { href: "/", label: "Overview", shortcut: "O" },
];

export const SPINNER_NAV: NavLink[] = SPINNER_ITEMS.map((item) => ({
  href: item.href,
  keywords: [item.slug],
  label: item.name,
}));

export const NAV_ITEMS: NavLink[] = [...TOP_LEVEL_NAV, ...SPINNER_NAV];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/jakubkrehel/loading",
    icon: GitHubLogoIcon,
    label: "GitHub",
  },
  {
    href: "https://www.npmjs.com/package/loading-dev",
    icon: NpmIcon,
    label: "npm",
  },
  {
    href: "/llms.txt",
    icon: MarkdownIcon,
    label: "llms.txt",
  },
];
