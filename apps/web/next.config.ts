import path from "node:path";
import { withInterfere } from "@interfere/next/config";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { CODE_THEMES } from "./src/lib/code-theme";
import { BLOB_BASE } from "./src/lib/constants";

const nextConfig = {
  experimental: {
    optimizePackageImports: ["motion"],
  },
  headers: async () => [
    {
      headers: [{ key: "Vary", value: "Accept" }],
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
        destination: "/spinners/:slug/markdown",
        has: [
          { key: "accept", type: "header", value: "(.*)text/markdown(.*)" },
        ],
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
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          grid: true,
          keepBackground: false,
          theme: CODE_THEMES,
        },
      ],
      "rehype-slug",
    ],
    remarkPlugins: [["remark-smartypants", { dashes: false }]],
  },
});

export default withInterfere(withMDX(nextConfig));
