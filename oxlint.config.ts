import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";
import vitest from "ultracite/oxlint/vitest";

const restrictedImports = {
  paths: [
    {
      allowTypeImports: true,
      importNames: ["default", "memo", "useMemo", "useCallback"],
      message:
        "Use named React imports without memo/useMemo/useCallback; React Compiler handles memoization.",
      name: "react",
    },
  ],
  patterns: [
    {
      group: ["@radix-ui/*", "!@radix-ui/react-icons", "radix-ui"],
      message: "Use @base-ui/react for interactive primitives.",
    },
    {
      group: ["framer-motion", "framer-motion/**"],
      message:
        "Use motion/react in client components or motion/react-client in server components.",
    },
  ],
};

export default defineConfig({
  extends: [core, react, vitest],
  ignorePatterns: [...(core.ignorePatterns ?? [])],
  overrides: [
    // Navigation changes close the external mobile dialog state.
    {
      files: ["apps/web/src/components/sidebar/mobile-nav.tsx"],
      rules: { "react/set-state-in-effect": "off" },
    },
    // Button primitives forward the caller’s type through their props.
    {
      files: [
        "apps/web/src/components/ui/button.tsx",
        "apps/web/src/components/ui/icon-button.tsx",
      ],
      rules: { "react/button-has-type": "off" },
    },
    // Base UI forwards the parent children and accessible props to render elements.
    {
      files: ["apps/web/src/components/spinner-detail/copy-page-button.tsx"],
      rules: { "jsx-a11y/control-has-associated-label": "off" },
    },
    // PostCSS uses an existing CommonJS configuration.
    {
      files: ["apps/web/postcss.config.js"],
      rules: { "unicorn/prefer-module": "off" },
    },
    {
      files: [
        "apps/web/**/*.{js,jsx,ts,tsx,mjs,mts}",
        "examples/consumer/**/*.{js,jsx,ts,tsx,mjs,mts}",
      ],
      plugins: ["nextjs"],
      rules: next.rules,
    },
    {
      files: ["**/*.{test,spec}.{ts,tsx,js,jsx}"],
      plugins: ["vitest"],
      rules: {
        "no-script-url": "off",
        "vitest/max-expects": "off",
        "vitest/padding-around-test-blocks": "off",
        "vitest/prefer-called-once": "off",
        "vitest/prefer-called-with": "off",
        "vitest/prefer-describe-function-title": "off",
        "vitest/prefer-each": "off",
        "vitest/prefer-expect-resolves": "off",
        "vitest/prefer-import-in-mock": "off",
        "vitest/prefer-mock-promise-shorthand": "off",
        "vitest/prefer-mock-return-shorthand": "off",
        "vitest/prefer-strict-equal": "off",
        "vitest/prefer-to-be-falsy": "off",
        "vitest/prefer-to-be-truthy": "off",
        "vitest/require-mock-type-parameters": "off",
        "vitest/require-to-throw-message": "off",
        "vitest/require-top-level-describe": "off",
        "vitest/valid-expect": [
          "error",
          {
            maxArgs: 2,
          },
        ],
      },
    },
    {
      files: ["**/page.{ts,tsx}", "**/layout.{ts,tsx}", "next.config.*"],
      rules: {
        "require-await": "off",
      },
    },
    {
      files: ["apps/web/src/components/ui/**/*.{ts,tsx}"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                allowTypeImports: true,
                importNames: ["default", "memo", "useMemo", "useCallback"],
                message:
                  "Use named React imports without memo/useMemo/useCallback; React Compiler handles memoization.",
                name: "react",
              },
            ],
            patterns: [
              {
                group: ["@radix-ui/*", "!@radix-ui/react-icons", "radix-ui"],
                message: "Use @base-ui/react for interactive primitives.",
              },
              {
                group: ["framer-motion", "framer-motion/**"],
                message:
                  "Use motion/react in client components or motion/react-client in server components.",
              },
              {
                message:
                  "Shared UI primitives must not depend on pages. Pass data and callbacks through props.",
                regex: "^(?:@/|(?:\\.\\./)+)app(?:/|$)",
              },
            ],
          },
        ],
      },
    },
  ],
  // Preserve established syntax; new style preferences do not rewrite published demos.
  rules: {
    // Count a switch once so explicit state cases do not inflate the limit.
    complexity: ["error", { max: 20, variant: "modified" }],
    eqeqeq: ["error", "always", { null: "ignore" }],
    // Function declarations and local helpers are established project conventions.
    "func-style": "off",
    "import/consistent-type-specifier-style": "off",
    "import/first": "error",
    "import/newline-after-import": "off",
    // Icon packages intentionally offer both default and named exports.
    "import/no-named-as-default": "off",
    // Demo controls have labels nested inside several visual wrappers.
    "jsx-a11y/control-has-associated-label": ["error", { depth: 5 }],
    // Custom SVG and interactive demos intentionally use explicit roles.
    "jsx-a11y/prefer-tag-over-role": "off",

    // Sequential writes, event callbacks and explicit Promise adapters are intentional.
    "no-await-in-loop": "off",
    // Null comparisons deliberately include undefined.
    "no-eq-null": "off",

    "no-plusplus": "off",
    "no-promise-executor-return": "error",
    "no-restricted-imports": ["error", restrictedImports],
    "no-return-assign": "error",
    // Destructuring may intentionally omit a prop before forwarding the rest.
    "no-unused-vars": ["error", { ignoreRestSiblings: true }],
    // Allow hoisted helpers and deferred closures; reject same-scope early reads.
    "no-use-before-define": [
      "error",
      { classes: false, functions: false, variables: false },
    ],
    "prefer-destructuring": "off",
    "prefer-named-capture-group": "off",
    "promise/always-return": ["error", { ignoreLastCallback: true }],
    "promise/avoid-new": "off",
    "promise/catch-or-return": "error",
    "promise/param-names": "off",
    "promise/prefer-await-to-callbacks": "off",
    "promise/prefer-await-to-then": "off",

    // Enable reviewed compiler checks; internal diagnostics remain off.
    "react/capitalized-calls": "error",
    "react/error-boundaries": "error",
    "react/exhaustive-effect-dependencies": "off",
    "react/function-component-definition": "off",
    "react/globals": "error",
    "react/hook-use-state": "off",
    "react/hooks": "off",
    "react/immutability": "error",
    "react/incompatible-library": "error",
    "react/invariant": "off",
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-handler-names": "off",

    // React Compiler owns memoization; MDX rendering uses Children and cloneElement.
    "react/jsx-no-constructed-context-values": "off",
    "react/jsx-no-target-blank": ["error", { allowReferrer: true }],
    "react/jsx-pascal-case": ["error", { allowAllCaps: true }],
    "react/memo-dependencies": "off",
    "react/no-clone-element": "off",
    "react/no-object-type-as-default-prop": "off",
    "react/no-react-children": "off",
    // JSX copy, setter names and render props retain their existing conventions.
    "react/no-unescaped-entities": "off",
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react/preserve-manual-memoization": "off",
    "react/purity": "error",
    "react/refs": "error",
    "react/rule-suppression": "off",
    "react/set-state-in-effect": "error",
    "react/set-state-in-render": "error",
    "react/static-components": "error",
    "react/syntax": "off",
    "react/todo": "off",
    "react/unsupported-syntax": "error",
    "react/use-memo": "off",
    "require-unicode-regexp": "off",

    // Biome owns import organization and property ordering during this stage.
    "sort-keys": "off",
    "typescript/array-type": "off",
    "typescript/consistent-type-imports": [
      "error",
      { disallowTypeAnnotations: false },
    ],
    "unicorn/catch-error-name": "off",
    "unicorn/consistent-existence-index-check": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/import-style": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-sort": "off",
    "unicorn/no-await-expression-member": "off",
    "unicorn/no-new-array": "off",
    "unicorn/no-object-as-default-parameter": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/numeric-separators-style": "off",
    "unicorn/prefer-add-event-listener": "off",
    "unicorn/prefer-export-from": "off",
    "unicorn/prefer-number-coercion": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/prefer-string-replace-all": "off",
    "unicorn/prefer-type-error": "off",
    "unicorn/switch-case-braces": "off",
    "unicorn/text-encoding-identifier-case": "off",
  },
});
