/**
 * Syncs a build to the server and generates a `pm2 restart` command.
 */
import { $, chalk, echo, spinner } from "zx";

function print(...args: string[]) {
    echo(chalk.green(args));
}

// Remote user to deploy as.
const user = "root";

// Remote host to deploy to.
const host = "craftingroomrecordings.co.uk";

// The directory on `host` to deploy to.
const dir = "/root/beta/";

// The local dir to deploy, containing a pm2 ecosystem file.
const artifact = "dist";

const machine = `${user}@${host}`;
const target = `${machine}:${dir}`;

await spinner(`sending build artifacts`, async () => {
    await $`rsync -avu --mkpath --delete-before ${artifact}/ ${target}`;
});
print(`✔ synced '${artifact}' to ${host}`);

echo(`now run`);
print(chalk.bold(`ssh ${machine} ". ~/.nvm/nvm.sh; cd ${dir} && pm2 restart ecosystem.config.cjs"`));
echo(`to restart the server`);
