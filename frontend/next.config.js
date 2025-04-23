import { resolve } from "path";

/** @type {import('next').NextConfig} */
export default {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    sassOptions: {
        silenceDeprecations: ["import", "global-builtin", "legacy-js-api", "mixed-decls"],
        includePaths: [
            resolve(import.meta.dirname, "lib/scss/**/*.scss"),
        ],
    },
};
