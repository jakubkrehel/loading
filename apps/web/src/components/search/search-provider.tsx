"use client";

import {
  type ReactNode,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { SearchContext } from "@/components/search/search-context";
import { SearchDialog } from "@/components/search/search-dialog";
import { useGoToShortcut } from "@/lib/use-go-to-shortcut";

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openSearch = () => {
    const active = document.activeElement;
    returnFocusRef.current =
      active instanceof HTMLElement && active !== document.body ? active : null;
    setOpen(true);
  };

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (open) {
        setOpen(false);
      } else {
        openSearch();
      }
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useGoToShortcut(!open);

  return (
    <SearchContext.Provider value={{ isSearchOpen: open, openSearch }}>
      {children}
      <SearchDialog
        onOpenChange={setOpen}
        open={open}
        returnFocusRef={returnFocusRef}
      />
    </SearchContext.Provider>
  );
}
