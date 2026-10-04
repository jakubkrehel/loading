"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSearchContext } from "@/components/search/search-context";
import { FIELD_BUTTON } from "@/components/ui/button-styles";
import { Kbd } from "@/components/ui/kbd";
import { useKeysPressed } from "@/lib/use-keys-pressed";
import { cn } from "@/lib/utils";

const SHORTCUT_KEYS = ["meta", "k"] as const;

function SearchShortcutHint({ enabled }: { enabled: boolean }) {
  const pressed = useKeysPressed(SHORTCUT_KEYS, enabled);

  return (
    <span aria-hidden className="flex items-center gap-0.5">
      <Kbd className="pt-[0.5px]" pressed={pressed.meta}>
        ⌘
      </Kbd>
      <Kbd pressed={pressed.k}>K</Kbd>
    </span>
  );
}

export function SidebarSearch() {
  const { isSearchOpen, openSearch } = useSearchContext();

  return (
    <button
      aria-keyshortcuts="Meta+K"
      className={cn(
        FIELD_BUTTON,
        "pr-1.5 pl-2 hover-hover:hover:bg-background"
      )}
      onClick={openSearch}
      type="button"
    >
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="size-4 shrink-0 text-content-subtle"
      />
      <span className="min-w-0 flex-1 truncate font-semimedium text-content-subtle text-sm">
        Search
      </span>
      <SearchShortcutHint enabled={!isSearchOpen} />
    </button>
  );
}
