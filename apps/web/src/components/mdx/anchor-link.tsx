"use client";

import { CheckCircledIcon, Link2Icon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { CopyAnnouncement } from "@/components/ui/copy-announcement";
import { COPY_FAILED_MESSAGE, useCopy } from "@/lib/use-copy";

const messages = {
  copied: "Link copied",
  failed: COPY_FAILED_MESSAGE,
} as const;

export function AnchorLink({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const { copy, status } = useCopy();

  return (
    <a
      className="group relative -ml-7 block pl-7 before:absolute before:-inset-1 before:content-['']"
      href={`#${id}`}
      onClick={() =>
        copy(`${window.location.origin}${window.location.pathname}#${id}`)
      }
    >
      <span className="absolute top-1/2 left-0 flex size-6 -translate-y-1/2 items-center justify-center opacity-0 transition-opacity duration-200 ease-out group-focus-visible:opacity-100 hover-hover:group-hover:opacity-100">
        <AnimatedIcon
          active={status === "copied"}
          activeIcon={
            <CheckCircledIcon className="size-4 text-content-subtle" />
          }
          idleIcon={<Link2Icon className="mb-px size-4 text-content-subtle" />}
        />
      </span>
      {children}
      <CopyAnnouncement messages={messages} status={status} />
    </a>
  );
}
