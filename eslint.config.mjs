import eslint from "@eslint/js";
import next from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import ts from "typescript-eslint";

export default defineConfig([
    eslint.configs.recommended,
    ts.configs.strict,
    ts.configs.stylistic,
    globalIgnores(["frontend/.next/**/*"]),
    globalIgnores(["cms/dist/**/*"]),
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
        files: [
            "**/*.tsx",
        ],
        plugins: {
            next,
        },
    },
]);

// export default ts.config(
//     eslint.configs.recommended,
//     ts.configs.strict,
//     ts.configs.stylistic,

//     stylistic.configs.customize({
//         indent: 4,
//         quotes: "double",
//         semi: true,
//     }),
//     {
//         rules: {
//             "@typescript-eslint/consistent-type-definitions": ["error", "type"],
//             "@stylistic/member-delimiter-style": ["error", {
//                 singleline: {
//                     requireLast: true,
//                 },
//             }],
//             "no-undef": "off",
//         },
//     },
//     {
//         files: [
//             "**/*.tsx",
//         ],
//         rules: {
//         },
//     },
// );
