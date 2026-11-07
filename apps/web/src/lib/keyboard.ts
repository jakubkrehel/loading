"use client";

import { useEffect, useEffectEvent } from "react";

const ARROW_DELTAS: Partial<Record<string, -1 | 1>> = {
  ArrowLeft: -1,
  ArrowRight: 1,
};

export const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName));

export function useArrowStep(onStep: (delta: -1 | 1) => void) {
  const step = useEffectEvent(onStep);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const delta = ARROW_DELTAS[event.key];
      if (
        delta === undefined ||
        event.repeat ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        isTyping(event.target)
      ) {
        return;
      }
      event.preventDefault();
      step(delta);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
}
