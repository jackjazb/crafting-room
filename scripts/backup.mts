/**
 * Backs up `data` from the remote instance.
 */
import { $, chalk, echo, spinner } from "zx";

// Remote user to deploy as.
const user = "root";

// Remote host to deploy to.
const host = "craftingroomrecordings.co.uk";

// The directory on `host` to back up.
const dir = "/root/data";

const outdir = "cms/.tmp";

const machine = `${user}@${host}`;
const target = `${machine}:${dir}`;

await spinner(`creating backup`, async () => {
    await $`rsync -avu ${target}/ ${outdir}`;
});

echo(chalk.green(`✔ backed up to '${outdir}'`));
