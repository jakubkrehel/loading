import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { interVariable, paperMono } from "./fonts";

export function RootDocument({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          interVariable.variable,
          paperMono.variable,
          "font-sans text-content antialiased",
          className
        )}
      >
        {children}
      </body>
    </html>
  );
}
