module.exports = {
    apps: [
        {
            name: "cms",
            cwd: "./cms",
            script: "pnpm",
            args: ["start"],
        },
        {
            name: "site",
            cwd: "./site",
            script: "node",
            args: ["build"],
            env: {
                PORT: "3001",
                STRAPI_HOST: "https://api.craftingroomrecordings.co.uk",
                PUBLIC_MEDIA_HOST: "https://api.craftingroomrecordings.co.uk",
                ORIGIN: "https://beta.craftingroomrecordings.co.uk",
            },
        },
    ],
};
