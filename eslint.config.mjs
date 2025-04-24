import { fixupConfigRules } from "@eslint/compat";
import eslint from "@eslint/js";
import next from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import ts from "typescript-eslint";

export default fixupConfigRules(
    defineConfig([
        eslint.configs.recommended,
        ts.configs.strict,
        ts.configs.stylistic,
        globalIgnores(["cms/dist/**/*"]),
        globalIgnores(["cms/types/generated/**/*"]),
        stylistic.configs.customize({
            indent: 4,
            quotes: "double",
            semi: true,
        }),
        {
            rules: {
                "@typescript-eslint/consistent-type-definitions": ["error", "type"],
                "@stylistic/member-delimiter-style": ["error", {
                    singleline: {
                        requireLast: true,
                    },
                }],
                "@stylistic/indent-binary-ops": "off",
                "no-undef": "off",
            },
        },
        {
            plugins: {
                "@next/next": next,
            },
            files: [
                "frontend/**/*.{ts,tsx}",
            ],
            rules: {
                ...next.configs.recommended.rules,
                ...next.configs["core-web-vitals"].rules,
            },
        },
    ]),
);
