"use client";

import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { track } from "@vercel/analytics";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { COPY_FAILED_MESSAGE, useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

const labels = {
  copied: "Copied",
  failed: COPY_FAILED_MESSAGE,
  idle: "Copy to clipboard",
} as const;

export interface CopyEvent {
  name: string;
  properties?: Record<string, boolean | number | string>;
}

export function CopyButton({
  className,
  event,
  text,
}: {
  className?: string;
  event?: CopyEvent;
  text: string;
}) {
  const { copy, status } = useCopy();
  const copied = status === "copied";

  return (
    <button
      aria-label={labels[status]}
      className={cn(
        "group grid size-7 shrink-0 place-items-center rounded-md transition-[scale,background-color] duration-200 ease-out hover-hover:hover:bg-background-hovered active:scale-[0.97]",
        className
      )}
      onClick={() => {
        copy(text);
        if (event) {
          track(event.name, event.properties);
        }
      }}
      type="button"
    >
      <AnimatedIcon
        active={copied}
        activeIcon={
          <CheckCircledIcon className="size-4 text-content-subtle will-change-transform" />
        }
        idleIcon={
          <CopyIcon className="size-4 text-content-subtle transition-colors duration-200 ease-out will-change-transform group-hover:text-content" />
        }
      />
      <span className="sr-only" role="status">
        {status === "idle" ? "" : labels[status]}
      </span>
    </button>
  );
}
