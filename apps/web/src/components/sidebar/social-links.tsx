import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { ComponentType } from "react";
import { NavItem } from "@/components/ui/nav-item";
import { MarkdownIcon } from "@/icons/markdown-icon";
import { NpmIcon } from "@/icons/npm-icon";

export const SOCIAL_LINKS: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}[] = [
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

export function SocialLinks() {
  return (
    <nav aria-label="Social" className="flex flex-col gap-0.5 px-4 pb-4">
      {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
        <NavItem
          href={href}
          icon={<Icon className="size-4 shrink-0" />}
          key={label}
          kind="external"
          label={label}
        />
      ))}
    </nav>
  );
}
