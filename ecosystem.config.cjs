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
        },
    ],
};
