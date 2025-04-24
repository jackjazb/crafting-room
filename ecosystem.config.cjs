module.exports = {
    apps: [
        {
            name: "cms",
            cwd: "./cms",
            script: "pnpm",
            args: ["start"],
            env: {
                HOST: "0.0.0.0",
                PORT: "1337",
                PUBLIC_URL: "https://api.craftingroomrecordings.co.uk",
                DATABASE_PATH: "/root/data/data.db",
                PUBLIC_DIR_PATH: "/root/data/public",
            },
        },
        {
            name: "site",
            cwd: "./site",
            script: "node",
            args: ["build"],
            env: {
                PORT: "3000",
                STRAPI_HOST: "https://api.craftingroomrecordings.co.uk",
                PUBLIC_MEDIA_HOST: "https://api.craftingroomrecordings.co.uk",
                ORIGIN: "https://craftingroomrecordings.co.uk",
            },
        },
    ],
};
