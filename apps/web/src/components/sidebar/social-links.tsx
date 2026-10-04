import { NavItem } from "@/components/ui/nav-item";
import { SOCIAL_LINKS } from "@/lib/navigation";

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
