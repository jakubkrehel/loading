import path from "node:path";
import { withInterfere } from "@interfere/next/config";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { BLOB_BASE } from "./src/lib/constants";

const MARKDOWN_ACCEPT = {
  key: "accept",
  type: "header",
  value: "(.*)text/markdown(.*)",
} as const;

const nextConfig = {
  experimental: {
    optimizePackageImports: ["motion"],
  },
  headers: async () => [
    {
      headers: [
        {
          key: "Link",
          value:
            '</markdown>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/plain"',
        },
      ],
      source: "/",
    },
    {
      headers: [
        {
          key: "Link",
          value:
            '</spinners/:slug/markdown>; rel="alternate"; type="text/markdown"',
        },
      ],
      source: "/spinners/:slug",
    },
  ],
  images: {
    remotePatterns: [
      {
        hostname: new URL(BLOB_BASE).hostname,
        protocol: "https",
      },
    ],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactCompiler: true,
  rewrites: async () => ({
    afterFiles: [],
    beforeFiles: [
      {
        destination: "/markdown",
        has: [MARKDOWN_ACCEPT],
        source: "/",
      },
      {
        destination: "/spinners/:slug/markdown",
        has: [MARKDOWN_ACCEPT],
        source: "/spinners/:slug",
      },
    ],
    fallback: [],
  }),
  turbopack: {
    root: path.resolve(import.meta.dirname, "../.."),
  },
} satisfies NextConfig;

const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-slug"],
    remarkPlugins: [["remark-smartypants", { dashes: false }]],
  },
});

export default withInterfere(withMDX(nextConfig));
