import type { ReactNode } from "react";

export function AsideShell({ children }: { children?: ReactNode }) {
  return (
    <aside className="hidden w-60 shrink-0 xl:block">
      <div className="sticky top-20 flex flex-col gap-4">{children}</div>
    </aside>
  );
}
