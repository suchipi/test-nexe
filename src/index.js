import fs from "fs";
import moment from "moment";
import * as pty from "node-pty";

console.log(
  "Testing moment to see if npm packages get bundled in the binary. They do."
);
console.log(`It is now ${moment().format("MMMM Do YYYY, h:mm:ss a")}`);

console.log(
  "Testing node-pty to if native code gets bundled in the binary. They don't, but if you put a node_modules folder next to the binary with the native code, it'll load them."
);
const child = pty.spawn("/bin/ls", ["-al", "."]);
child.onData((data) => process.stdout.write(data));

console.log(
  "Testing fs to see if you can read assets at runtime. You can (if you create a something.txt)."
);
console.log(fs.readFileSync("./something.txt"));
