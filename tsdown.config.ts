import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/*.ts", "src/*.tsx"],
  external: ["react", "react-dom"],
  fixedExtension: false,
  format: ["esm"],
});
