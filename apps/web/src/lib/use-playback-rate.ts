"use client";

import { type RefObject, useEffect } from "react";

export function usePlaybackRate(
  ref: RefObject<HTMLElement | null>,
  rate: number
) {
  useEffect(() => {
    for (const animation of ref.current?.getAnimations({ subtree: true }) ??
      []) {
      animation.updatePlaybackRate(rate);
    }
  });
}
