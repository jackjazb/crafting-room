import { $, chalk, echo } from "zx";

function print(...args) {
    echo(chalk.green(args));
}

async function execRemote(cmd) {
    await $`ssh ${machine} ".~/.nvm/nvm.sh; ${cmd}"`;
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

print(`running rsync -avu --mkpath --delete-before ${artifact}/ ${target}`);
await $`rsync -avu --mkpath --delete-before ${artifact}/ ${target}`;
print(`✔ synced '${artifact}' to ${host}`);

await execRemote("cd ${dir}; pm2 restart ecosystem.config.cjs");
print(`✔ restart remote instance`);
