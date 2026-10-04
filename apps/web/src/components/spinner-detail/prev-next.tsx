import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Text } from "@/components/ui/text";
import type { SpinnerItem } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const directions = {
  next: {
    icon: ArrowRightIcon,
    label: "Next",
    link: "flex-row-reverse",
    text: "items-start",
  },
  previous: {
    icon: ArrowLeftIcon,
    label: "Previous",
    link: "flex-row",
    text: "items-end text-end",
  },
};

function PrevNextLink({
  direction,
  item,
}: {
  direction: keyof typeof directions;
  item: SpinnerItem;
}) {
  const { icon: Icon, label, link, text } = directions[direction];

  return (
    <Link
      className={cn(
        "group flex min-w-0 flex-1 select-none items-center justify-between gap-3 rounded-xl border border-border px-3.5 py-3 transition-colors duration-200 ease-out hover-hover:hover:bg-background-hovered",
        link
      )}
      href={item.href}
    >
      <Icon className="size-4 shrink-0 text-content-subtle transition-colors duration-200 ease-out hover-hover:group-hover:text-content" />
      <span className={cn("flex min-w-0 flex-col", text)}>
        <Text
          as="span"
          className="text-content-subtle transition-colors duration-200 ease-out hover-hover:group-hover:text-content"
          size="sm"
        >
          {label}
        </Text>
        <Text
          as="span"
          className="w-full text-content"
          size="sm"
          truncate
          weight="semimedium"
        >
          {item.name}
        </Text>
      </span>
    </Link>
  );
}

export function PrevNext({
  next,
  previous,
}: {
  next?: SpinnerItem;
  previous?: SpinnerItem;
}) {
  return (
    <nav aria-label="More spinners" className="flex w-full gap-8">
      {previous ? (
        <PrevNextLink direction="previous" item={previous} />
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <PrevNextLink direction="next" item={next} />
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
