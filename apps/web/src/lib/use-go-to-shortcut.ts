"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GO_TO_KEY, TOP_LEVEL_NAV } from "@/lib/navigation";

const SEQUENCE_TIMEOUT_MS = 1000;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName));

export function useGoToShortcut(enabled: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) {
      return;
    }
    let awaitingKey = false;
    let timer: number | undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) {
        return;
      }
      if (isTyping(event.target)) {
        return;
      }
      const key = event.key.toUpperCase();
      if (!awaitingKey) {
        if (key === GO_TO_KEY) {
          awaitingKey = true;
          timer = window.setTimeout(() => {
            awaitingKey = false;
          }, SEQUENCE_TIMEOUT_MS);
        }
        return;
      }
      awaitingKey = false;
      window.clearTimeout(timer);
      const target = TOP_LEVEL_NAV.find((item) => item.shortcut === key);
      if (target) {
        event.preventDefault();
        router.push(target.href);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled, router]);
}
