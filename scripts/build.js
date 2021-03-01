#!/usr/bin/env node
const path = require("path");
const shelljs = require("shelljs");
const globby = require("globby");

function run(cmd) {
  return shelljs.exec(cmd, {
    env: {
      ...process.env,
      PATH: "./node_modules/.bin/:" + process.env.PATH,
    },
  });
}

async function main() {
  shelljs.rm("-rf", "build");
  shelljs.mkdir("build");

  run("babel src --out-dir dist");
  run("nexe -i dist/index.js -o ./build/app -t mac-x64-12.9.0");

  const nativeModules = await globby("node_modules/**/*.node");

  for (const filename of nativeModules) {
    shelljs.mkdir("-p", path.join("build", path.dirname(filename)));
    shelljs.cp(filename, path.join("build", filename));
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
