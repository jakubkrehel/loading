import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/copy-button";

export function CodeFrameLine({ children }: { children: ReactNode }) {
  return <span data-line="">{children}</span>;
}

export function CodeFrame({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  return (
    <figure className="relative w-full">
      <CopyButton className="absolute top-2 right-2" text={text} />
      <pre className="tab-size-4 overflow-x-auto overscroll-x-contain px-4 py-3 font-paper-mono text-[13px] leading-5 [scrollbar-color:var(--color-content-subtle)_transparent] scrollbar-thin **:font-paper-mono [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-content-subtle [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1">
        <code className="grid" data-theme="light dark">
          {children}
        </code>
      </pre>
    </figure>
  );
}
