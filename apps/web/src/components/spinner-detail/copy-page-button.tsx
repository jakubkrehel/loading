"use client";

import { ChevronDownIcon, CopyIcon } from "@radix-ui/react-icons";
import { track } from "@vercel/analytics";
import { markdownHref } from "@/components/spinners";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { ClaudeIcon } from "@/icons/claude-icon";
import { MarkdownIcon } from "@/icons/markdown-icon";
import { OpenaiIcon } from "@/icons/openai-icon";
import { DOMAIN } from "@/lib/constants";
import { COPY_FAILED_MESSAGE, useCopy } from "@/lib/use-copy";

const messages = {
  copied: "Page copied as Markdown",
  failed: COPY_FAILED_MESSAGE,
} as const;

function assistantPrompt(markdownUrl: string) {
  return encodeURIComponent(
    `Read ${markdownUrl} so I can ask questions about it.`
  );
}

export function CopyPageButton({
  markdown,
  slug,
}: {
  markdown: string;
  slug: string;
}) {
  const { copy, status } = useCopy();
  const markdownPath = markdownHref(slug);
  const markdownUrl = `${DOMAIN}${markdownPath}`;

  return (
    <div className="flex flex-col gap-1.5">
      <DropdownMenu>
        <DropdownMenuTrigger className="group flex h-8 w-full cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors duration-200 hover-hover:hover:bg-modal-hovered">
          <Text
            as="span"
            className="flex-1 text-left text-content"
            size="sm"
            weight="medium"
          >
            Copy page
          </Text>
          <ChevronDownIcon className="size-4 text-content-subtle transition-transform duration-200 ease-out group-data-popup-open:rotate-180" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-(--anchor-width)">
          <DropdownMenuItem
            onClick={() => {
              copy(markdown);
              track("Page Exported", { spinner: slug, target: "clipboard" });
            }}
          >
            <CopyIcon />
            Copy to clipboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              track("Page Exported", { spinner: slug, target: "markdown" })
            }
            render={<a href={markdownPath} rel="noreferrer" target="_blank" />}
          >
            <MarkdownIcon />
            View as markdown
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() =>
              track("Page Exported", { spinner: slug, target: "chatgpt" })
            }
            render={
              <a
                href={`https://chatgpt.com/?hints=search&q=${assistantPrompt(markdownUrl)}`}
                rel="noreferrer"
                target="_blank"
              />
            }
          >
            <OpenaiIcon />
            Open in ChatGPT
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              track("Page Exported", { spinner: slug, target: "claude" })
            }
            render={
              <a
                href={`https://claude.ai/new?q=${assistantPrompt(markdownUrl)}`}
                rel="noreferrer"
                target="_blank"
              />
            }
          >
            <ClaudeIcon />
            Open in Claude
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {status === "failed" && (
        <Text as="p" className="px-2 text-content-subtle" size="sm">
          {messages.failed}
        </Text>
      )}
      <Text as="span" className="sr-only" role="status" size="sm">
        {status === "idle" ? "" : messages[status]}
      </Text>
    </div>
  );
}
