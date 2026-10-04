import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  // tsup sets baseUrl for its declaration build, which TypeScript 6 deprecates
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  entry: ["src/*.ts", "src/*.tsx"],
  external: ["react", "react-dom"],
  format: ["esm"],
  splitting: true,
});
