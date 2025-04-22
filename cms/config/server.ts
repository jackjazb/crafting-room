import { resolve } from "path";
import findRoot from "find-root";
import type { Config } from "./lib/types";
import { createPublicDir } from "./lib/utils";

const cmsRootDir = findRoot(__dirname);

const server: Config = ({ env }) => {
    return {
        host: env("HOST", "0.0.0.0"),
        port: env.int("PORT", 1337),
        app: {
            keys: env.array("APP_KEYS"),
        },
        url: env("PUBLIC_URL"),
        dirs: {
            public: env("PUBLIC_DIR_PATH")
                ? resolve(env("PUBLIC_DIR_PATH"))
                : createPublicDir(resolve(cmsRootDir, ".tmp")),
        },
    };
};

export default server;
