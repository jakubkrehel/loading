"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Kbd } from "@/components/ui/kbd";
import { LogoMark } from "@/components/ui/logo";
import { ReturnIcon } from "@/icons/return-icon";
import { useKeysPressed } from "@/lib/use-keys-pressed";

const FOOTER_KEYS = ["arrowup", "arrowdown", "enter", "escape"] as const;

export function SearchFooter() {
  const pressed = useKeysPressed(FOOTER_KEYS);

  return (
    <div
      aria-hidden
      className="hidden items-center justify-between border-border border-t bg-background-subtle p-3 text-sm text-content-subtle sm:flex"
    >
      <LogoMark className="size-4.5 text-orange" />
      <div className="flex select-none items-center gap-4">
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Kbd pressed={pressed.arrowdown}>
              <ArrowDownIcon className="size-3" />
            </Kbd>
            <Kbd pressed={pressed.arrowup}>
              <ArrowUpIcon className="size-3" />
            </Kbd>
          </span>
          Navigate
        </span>
        <span className="flex items-center gap-2">
          <Kbd pressed={pressed.enter}>
            <ReturnIcon className="size-3" />
          </Kbd>
          Select
        </span>
        <span className="flex items-center gap-2 leading-none">
          <Kbd className="px-1.5" pressed={pressed.escape} uppercase={false}>
            <span className="mb-px">esc</span>
          </Kbd>
          Close
        </span>
      </div>
    </div>
  );
}
