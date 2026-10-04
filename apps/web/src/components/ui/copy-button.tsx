"use client";

import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { track } from "@vercel/analytics";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { BUTTON_BASE } from "@/components/ui/button-styles";
import { CopyAnnouncement } from "@/components/ui/copy-announcement";
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
        BUTTON_BASE,
        "size-7 rounded-md hover-hover:hover:bg-background-hovered",
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
          <CopyIcon className="size-4 text-content-subtle transition-colors duration-200 ease-out will-change-transform hover-hover:group-hover:text-content" />
        }
      />
      <CopyAnnouncement messages={labels} status={status} />
    </button>
  );
}
