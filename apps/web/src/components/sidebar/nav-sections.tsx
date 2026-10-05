"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "@/components/ui/nav-item";
import { type NavLink, SPINNER_NAV, TOP_LEVEL_NAV } from "@/lib/navigation";

const GROUPS: NavLink[][] = [TOP_LEVEL_NAV, SPINNER_NAV];

export function NavSections() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex flex-col gap-5 px-4">
      {GROUPS.map((items) => (
        <div className="flex flex-col gap-0.5" key={items[0]?.href}>
          {items.map((item) => (
            <NavItem
              active={pathname === item.href}
              href={item.href}
              key={item.href}
              label={item.label}
            />
          ))}
        </div>
      ))}
    </nav>
  );
}
