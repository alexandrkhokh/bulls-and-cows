import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
]);
