/**
 * Assembles a final build artifact in `dist` which can be run with `pm2 start ecosystem.config.cjs`
 */
import { $, chalk, echo, fs, path, spinner } from "zx";

function print(...args) {
    echo(chalk.green(args));
}

const outdir = "dist";
const cms = `${outdir}/cms`;
const pm2conf = "ecosystem.config.cjs";

// Assemble `dist`
await spinner("copying artifacts", async () => {
    await fs.rm(`${outdir}`, { recursive: true, force: true });
    for (const ws of ["site", "cms"]) {
        await $`pnpm --filter=${ws} deploy ${outdir}/${ws}`;
    }

    // Fixup Strapi build structure - we need everything in cms/dist flattened.
    const nestedDist = `${cms}/dist`;
    for (const f of await fs.readdir(nestedDist)) {
        await fs.move(path.join(nestedDist, f), path.join(cms, f));
    }
    await fs.rm(nestedDist, { recursive: true, force: true });

    await fs.copy(pm2conf, path.join(outdir, pm2conf));
});

print("✔ artifacts copied");
