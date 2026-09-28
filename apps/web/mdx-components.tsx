import type { MDXComponents } from "mdx/types";
import { MDXCode } from "@/components/mdx/code";
import { MDXHeading } from "@/components/mdx/heading";
import { MDXParagraph } from "@/components/mdx/paragraph";

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    code: MDXCode,
    h2: MDXHeading,
    p: MDXParagraph,
    ...components,
  };
}
