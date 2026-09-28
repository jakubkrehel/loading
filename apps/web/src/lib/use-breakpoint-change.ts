"use client";

import { useEffect, useEffectEvent, useRef } from "react";

const BREAKPOINTS = [
  "(min-width: 640px)",
  "(min-width: 768px)",
  "(min-width: 1280px)",
];

export function useBreakpointChange(onChange: () => void) {
  const handle = useEffectEvent(onChange);

  useEffect(() => {
    const lists = BREAKPOINTS.map((query) => window.matchMedia(query));
    for (const list of lists) {
      list.addEventListener("change", handle);
    }
    return () => {
      for (const list of lists) {
        list.removeEventListener("change", handle);
      }
    };
  }, []);
}

export function useCloseOnBreakpointChange<
  Actions extends { close: () => void },
>() {
  const actionsRef = useRef<Actions | null>(null);
  useBreakpointChange(() => actionsRef.current?.close());
  return actionsRef;
}
