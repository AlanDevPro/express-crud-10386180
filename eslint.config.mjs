import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],

    plugins: {
      js
    },

    extends: ["js/recommended"],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",

      globals: {
        ...globals.node,

        describe: "readonly",
        test: "readonly",
        expect: "readonly"
      }
    }
  }
]);