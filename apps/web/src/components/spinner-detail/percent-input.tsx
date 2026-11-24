"use client";

import { useState } from "react";
import { Text } from "@/components/ui/text";

const MIN = 0;

const MAX = 100;

export function PercentInput({
  className,
  label,
  onChange,
  value,
}: {
  className: string;
  label: string;
  onChange: (percent: number) => void;
  value: number;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  function commit() {
    if (draft === null) {
      return;
    }
    const parsed = Number.parseInt(draft, 10);
    if (!Number.isNaN(parsed)) {
      onChange(Math.min(Math.max(parsed, MIN), MAX));
    }
    setDraft(null);
  }

  return (
    <>
      <input
        aria-label={label}
        className={className}
        inputMode="numeric"
        onBlur={commit}
        onChange={(event) =>
          setDraft(event.target.value.replace(/\D/g, "").slice(0, 3))
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        type="text"
        value={draft ?? String(value)}
      />
      <Text as="span" color="popover-content-subtle" size="sm">
        %
      </Text>
    </>
  );
}
