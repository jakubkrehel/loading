"use client";

import { useEffect, useEffectEvent, useState } from "react";

const MIN_PRESS_MS = 200;

export function useKeysPressed<const K extends readonly string[]>(
  keys: K,
  enabled = true
) {
  const [pressed, setPressed] = useState<Partial<Record<K[number], boolean>>>(
    {}
  );
  const isEnabled = useEffectEvent(() => enabled);

  useEffect(() => {
    const watched = new Set<string>(keys);
    const downAt: Record<string, number> = {};
    const timers: Record<string, number> = {};

    const setKey = (key: string, value: boolean) =>
      setPressed((current) =>
        (current[key as K[number]] ?? false) === value
          ? current
          : { ...current, [key]: value }
      );

    const release = (key: string) => {
      const remaining = MIN_PRESS_MS - (performance.now() - (downAt[key] ?? 0));
      window.clearTimeout(timers[key]);
      if (remaining <= 0) {
        setKey(key, false);
        return;
      }
      timers[key] = window.setTimeout(() => setKey(key, false), remaining);
    };

    const releaseAll = () => {
      for (const key of watched) {
        release(key);
      }
    };

    const watchedKey = (event: KeyboardEvent) => {
      const key = event.key?.toLowerCase();
      return key && watched.has(key) ? key : null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isEnabled()) {
        return;
      }
      const key = watchedKey(event);
      if (!key) {
        return;
      }
      window.clearTimeout(timers[key]);
      downAt[key] = performance.now();
      setKey(key, true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Meta" && watched.has("meta")) {
        releaseAll();
        return;
      }
      const key = watchedKey(event);
      if (key) {
        release(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
    window.addEventListener("blur", releaseAll);
    return () => {
      for (const timer of Object.values(timers)) {
        window.clearTimeout(timer);
      }
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
      window.removeEventListener("blur", releaseAll);
    };
  }, [keys]);

  return pressed;
}
