import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function RootDocument({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <html lang="en">
      <body className={cn("font-sans text-content antialiased", className)}>
        {children}
      </body>
    </html>
  );
}
