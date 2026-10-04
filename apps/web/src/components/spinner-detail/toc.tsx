"use client";

import { m } from "motion/react";
import { useEffect, useState } from "react";
import { NAV_ROW } from "@/components/ui/nav-item";
import { Text } from "@/components/ui/text";
import { PROSE_SECTION_ID } from "@/lib/constants";
import type { TocItem } from "@/lib/spinner-markdown";
import { cn } from "@/lib/utils";

const ROW_HEIGHT_REM = 2;
const ROW_GAP_REM = 0.125;

const HIGHLIGHT_SPRING = {
  damping: 80,
  mass: 2,
  stiffness: 800,
  type: "spring" as const,
};

function sameIndexes(a: number[], b: number[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function visibleSections(targets: (HTMLElement | null)[]) {
  const viewportHeight = window.innerHeight;
  const tops = targets.map(
    (target) => target?.getBoundingClientRect().top ?? null
  );
  const end =
    document.getElementById(PROSE_SECTION_ID)?.getBoundingClientRect().bottom ??
    Number.POSITIVE_INFINITY;

  const visible: number[] = [];
  tops.forEach((top, index) => {
    if (top === null) {
      return;
    }
    const nextTop = tops.slice(index + 1).find((value) => value !== null);
    const bottom = nextTop ?? end;
    if (bottom > 0 && top < viewportHeight) {
      visible.push(index);
    }
  });
  return visible;
}

function TocLink({
  current,
  item,
  visible,
}: {
  current: boolean;
  item: TocItem;
  visible: boolean;
}) {
  return (
    <Text
      aria-current={current ? "location" : undefined}
      as="a"
      className={cn(
        NAV_ROW,
        "transition-colors duration-200 ease-out",
        visible
          ? "text-content"
          : "text-content-subtle hover-hover:hover:text-content"
      )}
      href={`#${item.id}`}
      size="sm"
      style={{ height: `${ROW_HEIGHT_REM}rem` }}
      weight="semimedium"
    >
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
    </Text>
  );
}

export function Toc({ items }: { items: TocItem[] }) {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const targets = items.map((item) => document.getElementById(item.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const next = visibleSections(targets);
      setVisible((previous) => (sameIndexes(previous, next) ? previous : next));
    };

    const schedule = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  const [first] = visible;
  const last = visible.at(-1);
  const highlight =
    first === undefined || last === undefined
      ? null
      : {
          height: `${(last - first + 1) * ROW_HEIGHT_REM + (last - first) * ROW_GAP_REM}rem`,
          y: `${first * (ROW_HEIGHT_REM + ROW_GAP_REM)}rem`,
        };

  return (
    <nav aria-label="On this page">
      <ul
        className="relative isolate flex flex-col"
        style={{ gap: `${ROW_GAP_REM}rem` }}
      >
        {highlight && (
          <m.div
            animate={highlight}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-1 rounded-lg bg-background"
            initial={false}
            transition={HIGHLIGHT_SPRING}
          />
        )}
        {items.map((item, index) => (
          <li key={item.id}>
            <TocLink
              current={first === index}
              item={item}
              visible={visible.includes(index)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
