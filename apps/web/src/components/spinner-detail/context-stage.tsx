import type { ReactNode } from "react";

export function ContextStage({
  spinner,
}: {
  spinner: (size: number) => ReactNode;
}) {
  return (
    <div className="flex w-full max-w-64 select-none flex-col items-stretch gap-3 text-sm">
      <div className="flex gap-2">
        <span className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-content px-3 font-medium text-surface">
          {spinner(16)}
          Saving
        </span>
        <span className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-modal px-3 font-medium text-content shadow-custom">
          {spinner(16)}
          Syncing
        </span>
      </div>
      <span className="flex h-9 items-center justify-between gap-2 rounded-lg border border-border bg-background-subtle px-3 text-content-subtle">
        Searching spinners…
        {spinner(16)}
      </span>
      <span className="flex items-center gap-2 px-1 text-content-subtle">
        {spinner(14)}
        Generating a response
      </span>
    </div>
  );
}
