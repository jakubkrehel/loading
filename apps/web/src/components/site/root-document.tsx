import type { ReactNode } from "react";
import { interVariable, paperMono } from "@/app/fonts";
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
