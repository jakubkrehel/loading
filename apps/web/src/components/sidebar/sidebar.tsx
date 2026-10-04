import { ScrollArea } from "@base-ui/react/scroll-area";
import { NavSections } from "@/components/sidebar/nav-sections";
import { SidebarSearch } from "@/components/sidebar/sidebar-search";
import { SocialLinks } from "@/components/sidebar/social-links";
import { Credits } from "@/components/site/credits";
import { Logo } from "@/components/ui/logo";
import { ScrollAreaScrollbar } from "@/components/ui/scroll-area";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-(--sidebar-width) flex-col gap-6 border-border border-r bg-background-subtle md:flex">
      <div className="px-6 pt-6 pb-2">
        <Logo className="[&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-out hover-hover:hover:[&>svg]:rotate-45 motion-reduce:[&>svg]:transition-none" />
      </div>
      <div className="px-4">
        <SidebarSearch />
      </div>
      <ScrollArea.Root className="-my-1 flex min-h-0 grow flex-col">
        <ScrollArea.Viewport className="scroll-fade-y min-h-0 grow py-1">
          <NavSections />
        </ScrollArea.Viewport>
        <ScrollAreaScrollbar />
      </ScrollArea.Root>
      <div className="flex flex-col">
        <SocialLinks />
        <Credits />
      </div>
    </aside>
  );
}
