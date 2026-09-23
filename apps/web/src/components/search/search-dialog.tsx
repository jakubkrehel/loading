"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { CrossCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command, useCommandState } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { type RefObject, useRef, useState } from "react";
import {
  GO_TO_KEY,
  type NavItem,
  SPINNER_NAV,
  TOP_LEVEL_NAV,
} from "@/components/sidebar/nav-items";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { SearchFooter } from "./search-footer";

const ITEM_CLASSNAME =
  "group flex cursor-pointer select-none items-center gap-1 rounded-xl p-2 text-[13px] text-content leading-5 data-[selected=true]:bg-background-hovered";

const GROUP_CLASSNAME =
  "p-1 **:[[cmdk-group-items]]:flex **:[[cmdk-group-items]]:flex-col **:[[cmdk-group-items]]:gap-0.5 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-[13px] **:[[cmdk-group-heading]]:text-content-subtle **:[[cmdk-group-heading]]:leading-5";

type CloseAction =
  | { reason: "dismiss" }
  | { reason: "navigate"; href: string; completed: boolean };

export function SearchDialog({
  onOpenChange,
  open,
  returnFocusRef,
}: {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const closeActionRef = useRef<CloseAction>({ reason: "dismiss" });

  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
    }
  }

  const navigateTo = (href: string) => {
    closeActionRef.current = { completed: false, href, reason: "navigate" };
    if (href !== pathname) {
      router.prefetch(href);
    }
    onOpenChange(false);
  };

  const runPendingNavigation = () => {
    const action = closeActionRef.current;
    if (action.reason !== "navigate" || action.completed) {
      return;
    }
    action.completed = true;
    router.push(action.href);
  };

  return (
    <Dialog.Root
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          runPendingNavigation();
        }
      }}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/10 transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 dark:bg-black/30" />
        <Dialog.Popup
          className={cn(
            "fixed top-[18%] left-1/2 z-50 w-[calc(100vw-2.5rem)] max-w-180 -translate-x-1/2",
            "overflow-clip rounded-2xl bg-modal outline-hidden",
            "shadow-custom transition-[transform,scale,opacity] duration-200 ease-out",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0"
          )}
          finalFocus={() => {
            if (closeActionRef.current.reason === "navigate") {
              return false;
            }
            const element = returnFocusRef.current;
            return element?.isConnected ? element : false;
          }}
          initialFocus={() => {
            closeActionRef.current = { reason: "dismiss" };
            return inputRef.current;
          }}
        >
          <Dialog.Title className="sr-only">Search spinners</Dialog.Title>

          <Command label="Search spinners">
            <div className="flex items-center p-2">
              <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg px-2">
                <MagnifyingGlassIcon className="size-4 shrink-0 text-content-subtle" />
                <div className="h-full min-w-0 flex-1">
                  <Command.Input
                    className="h-full w-[calc(100%/0.8125)] origin-left scale-[0.8125] bg-transparent text-[16px] text-content leading-[calc(1.125/0.8125)] outline-none placeholder:text-content-subtle placeholder:opacity-50 sm:w-full sm:scale-100 sm:text-[13px]"
                    onValueChange={setQuery}
                    placeholder="Search"
                    ref={inputRef}
                    value={query}
                  />
                </div>
              </div>
            </div>
            <div className="h-px w-full bg-border" />

            <ScrollArea.Root className="relative">
              <ScrollArea.Viewport
                render={
                  <Command.List className="h-(--cmdk-list-height) max-h-92 scroll-py-1 transition-[height] duration-150 ease-out" />
                }
              >
                <EmptyRow
                  onClearQuery={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                />

                <Command.Group className={GROUP_CLASSNAME}>
                  {TOP_LEVEL_NAV.map((row) => (
                    <NavRow key={row.href} onNavigate={navigateTo} row={row} />
                  ))}
                </Command.Group>
                <Command.Separator className="h-px w-full bg-border" />
                <Command.Group className={GROUP_CLASSNAME} heading="Components">
                  {SPINNER_NAV.map((row) => (
                    <NavRow key={row.href} onNavigate={navigateTo} row={row} />
                  ))}
                </Command.Group>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="my-1 me-px w-1.5 opacity-0 transition-opacity duration-100 ease-out data-hovering:opacity-100 data-scrolling:opacity-100"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="w-full rounded-full bg-content-subtle/40" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            <SearchFooter />
          </Command>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NavRow({
  onNavigate,
  row,
}: {
  onNavigate: (href: string) => void;
  row: NavItem;
}) {
  return (
    <Command.Item
      className={ITEM_CLASSNAME}
      keywords={row.keywords}
      onSelect={() => onNavigate(row.href)}
      value={row.label}
    >
      <span className="min-w-0 flex-1 truncate px-1 font-semimedium">
        {row.label}
      </span>
      {row.shortcut && (
        <span className="flex flex-none items-center gap-1">
          <Kbd>{GO_TO_KEY}</Kbd>
          <span className="text-[11px] text-content-subtle">then</span>
          <Kbd>{row.shortcut}</Kbd>
        </span>
      )}
    </Command.Item>
  );
}

function EmptyRow({ onClearQuery }: { onClearQuery: () => void }) {
  const isEmpty = useCommandState((state) => state.filtered.count === 0);

  if (!isEmpty) {
    return null;
  }

  return (
    <Command.Group className="p-1" forceMount>
      <Command.Item
        className={cn(ITEM_CLASSNAME, "justify-between")}
        forceMount
        onSelect={onClearQuery}
        value="no-results-clear-search"
      >
        <span className="flex items-center gap-2.5">
          <CrossCircledIcon className="size-4 shrink-0 text-content-subtle" />
          <span className="font-semimedium">No results found</span>
        </span>
        <span className="font-semimedium text-content-subtle">
          Clear search
        </span>
      </Command.Item>
    </Command.Group>
  );
}
