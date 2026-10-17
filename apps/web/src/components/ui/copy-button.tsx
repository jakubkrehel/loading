"use client";

import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { track } from "@vercel/analytics";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { BUTTON_BASE } from "@/components/ui/button-styles";
import { CopyAnnouncement } from "@/components/ui/copy-announcement";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

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
  const { announcement, copy, status } = useCopy("Copied");
  const copied = status === "copied";

  return (
    <button
      aria-label={announcement || "Copy to clipboard"}
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
      <CopyAnnouncement>{announcement}</CopyAnnouncement>
    </button>
  );
}
