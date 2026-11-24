import type { ReactNode } from "react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function PageHeader({
  className,
  description,
  eyebrow,
  title,
}: {
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
}) {
  return (
    <header className={cn("flex flex-col gap-5 sm:px-4", className)}>
      <Heading as="h1" size={1} weight="medium">
        {eyebrow && (
          <span className="block text-content-subtle">{eyebrow}</span>
        )}
        {title}
      </Heading>
      {description && (
        <Text
          className="max-w-lg text-pretty"
          color="content-subtle"
          size="base"
        >
          {description}
        </Text>
      )}
    </header>
  );
}
