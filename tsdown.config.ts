import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/*.ts", "src/*.tsx"],
  external: ["react", "react-dom"],
  // The package exports point at `.js`/`.d.ts`, not tsdown's default `.mjs`.
  fixedExtension: false,
  format: ["esm"],
});
