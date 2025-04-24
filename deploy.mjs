import { exit } from "process";
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

print(`rsync -avu --mkpath --delete-before ${artifact}/ ${target}`);
await $`rsync -avu --mkpath --delete-before ${artifact}/ ${target}`;
print(`synced '${artifact}' to ${host}`);
exit();
// console.log(`ssh ${machine} "cd ${dir}; pm2 start ecosystem.config.js"`);

// await $`ssh ${machine} "sudo apt install node"`;
// await $`ssh ${machine} "npm i -g pm2"`;

// await $`ssh ${machine} "cd ${dir}; pm2 start ecosystem.config.js"`;
