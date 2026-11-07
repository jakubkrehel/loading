"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isTyping } from "@/lib/use-go-to-shortcut";

export function PrevNextShortcut({
  next,
  previous,
}: {
  next?: string;
  previous?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        isTyping(event.target)
      ) {
        return;
      }
      const href = { ArrowLeft: previous, ArrowRight: next }[event.key];
      if (href) {
        event.preventDefault();
        router.push(href, { scroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [next, previous, router]);

  return null;
}
