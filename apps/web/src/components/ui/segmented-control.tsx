"use client";

import { m } from "motion/react";
import { useId } from "react";
import { CONTROL_SURFACE } from "@/components/ui/control";
import { cn } from "@/lib/utils";

const INDICATOR_TRANSITION = {
  bounce: 0,
  duration: 0.3,
  type: "spring",
} as const;

const SIZES = {
  md: {
    group: cn(CONTROL_SURFACE, "w-full"),
    indicator: "rounded-lg",
    option: "h-8 pointer-coarse:h-10 min-w-0 flex-1 rounded-lg text-sm",
  },
  sm: {
    group: "gap-0.5",
    indicator: "rounded-md",
    option: "h-7 rounded-md px-2 text-xs",
  },
};

export function SegmentedControl<Value extends string | number>({
  disabled = false,
  label,
  onValueChange,
  options,
  size = "md",
  value,
}: {
  disabled?: boolean;
  label: string;
  onValueChange: (value: Value) => void;
  options: readonly { label: string; value: Value }[];
  size?: keyof typeof SIZES;
  value: Value;
}) {
  const groupId = useId();
  const sizing = SIZES[size];

  return (
    <fieldset
      aria-label={label}
      className={cn(
        sizing.group,
        "flex items-center transition-opacity duration-200 ease-out disabled:pointer-events-none disabled:opacity-50"
      )}
      disabled={disabled}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <label
            className={cn(
              "relative flex cursor-pointer items-center justify-center font-medium transition-colors duration-200 ease-out",
              sizing.option,
              "has-focus-visible:outline-2 has-focus-visible:outline-content has-focus-visible:outline-offset-2",
              isActive
                ? "text-content"
                : "text-content-subtle hover-hover:hover:text-content"
            )}
            key={option.value}
          >
            <input
              checked={isActive}
              className="sr-only"
              name={groupId}
              onChange={() => onValueChange(option.value)}
              type="radio"
              value={String(option.value)}
            />
            {isActive && (
              <m.span
                className={cn(
                  "pointer-events-none absolute inset-0 border border-border bg-background",
                  sizing.indicator
                )}
                layoutId={`segmented-control-${groupId}`}
                transition={INDICATOR_TRANSITION}
              />
            )}
            <span className="relative z-10 select-none">{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
