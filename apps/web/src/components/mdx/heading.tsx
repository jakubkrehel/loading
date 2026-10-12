"use client";

import type { ComponentPropsWithoutRef } from "react";
import { AnchorLink } from "@/components/mdx/anchor-link";
import { CopyAnnouncement } from "@/components/ui/copy-announcement";
import { Heading } from "@/components/ui/heading";
import { COPY_FAILED_MESSAGE, useCopy } from "@/lib/use-copy";

const messages = {
  copied: "Link copied",
  failed: COPY_FAILED_MESSAGE,
} as const;

export function MDXHeading({ children, id }: ComponentPropsWithoutRef<"h2">) {
  const { copy, status } = useCopy();

  return (
    <>
      <Heading
        as="h2"
        className="mt-16 mb-1 w-fit scroll-mt-20 sm:ms-4"
        id={id}
        size={4}
        weight="semibold"
      >
        {id ? (
          <AnchorLink copied={status === "copied"} id={id} onCopy={copy}>
            {children}
          </AnchorLink>
        ) : (
          children
        )}
      </Heading>
      {id ? <CopyAnnouncement messages={messages} status={status} /> : null}
    </>
  );
}
