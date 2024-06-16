// @ts-check

import eslint from "@eslint/js";
import eslintPluginSvelte from "eslint-plugin-svelte";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],
  ...eslintPluginSvelte.configs["flat/prettier"],
  {
    ignores: [".svelte-kit/", "build/"],
  },
];
