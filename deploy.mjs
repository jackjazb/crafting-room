import { $, chalk, echo } from "zx";

function print(...args) {
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

print(`running rsync -avu --mkpath --delete-before ${artifact}/ ${target}`);
await $`rsync -avu --mkpath --delete-before ${artifact}/ ${target}`;
print(`✔ synced '${artifact}' to ${host}`);

console.log(`ssh ${machine} "cd ${dir}; pm2 start ecosystem.config.js"`);
