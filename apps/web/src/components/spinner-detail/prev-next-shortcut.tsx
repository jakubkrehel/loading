"use client";

import { useRouter } from "next/navigation";
import { useArrowStep } from "@/lib/keyboard";

export function PrevNextShortcut({
  next,
  previous,
}: {
  next?: string;
  previous?: string;
}) {
  const router = useRouter();

  useArrowStep((delta) => {
    const href = delta < 0 ? previous : next;
    if (href) {
      router.push(href);
    }
  });

  return null;
}
