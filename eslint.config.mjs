import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base configuration for all files
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  
  // TypeScript recommended configuration
  ...tseslint.configs.recommended,

  // Frontend specific configuration (Next.js + React)
  {
    files: ["frontend/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Add React/Next.js specific rules here
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  // Backend specific configuration (Bun + Node.js)
  {
    files: ["backend/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        Bun: "readonly",
      },
    },
    rules: {
      // Add any backend-specific rules here
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },

  // Ignore patterns
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/*.config.{js,ts,mjs,mts}",
      "next-env.d.ts",
      "**/.claude/**",
      "**/.cursor/**",
      "**/.gemini/**",
      "**/.impeccable/**",
    ],
  },
]);
