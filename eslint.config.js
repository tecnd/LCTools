// @ts-check

import eslint from "@eslint/js";
import eslintPluginSvelte from "eslint-plugin-svelte";
import tseslint from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],
  ...eslintPluginSvelte.configs["flat/prettier"],
  {
    files: ["**/*.svelte", "*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        svelteConfig,
      },
    },
  },
  {
    rules: {
      "svelte/no-at-html-tags": "warn",
    },
  },
  {
    ignores: [".svelte-kit/", "build/"],
  },
];
