import type { ComponentPropsWithoutRef } from "react";

export function MDXCode({ children }: ComponentPropsWithoutRef<"code">) {
  return <code className="code-inline">{children}</code>;
}
