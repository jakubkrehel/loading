"use client";

import type { ComponentPropsWithoutRef } from "react";
import { AnchorLink } from "@/components/mdx/anchor-link";
import { CopyAnnouncement } from "@/components/ui/copy-announcement";
import { Heading } from "@/components/ui/heading";
import { useCopy } from "@/lib/use-copy";

export function MDXHeading({ children, id }: ComponentPropsWithoutRef<"h2">) {
  const { announcement, copy, status } = useCopy("Link copied");

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
      {id ? <CopyAnnouncement>{announcement}</CopyAnnouncement> : null}
    </>
  );
}
