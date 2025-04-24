import { $ } from "zx";

const target = "jack@localhost:/home/";
const artifact = "dist";

$`rsync -r ${target}: ${artifact}`;
