const chokidar = require("chokidar");
const watcher = chokidar.watch("./", { persistent: true });
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

watcher.on("change", async (path) => {
  if (__filename.includes(path)) return;
  console.clear();
  console.log(`File Changed: ${path}`);
  const out = await getConsoleOutput(path);

  console.log("Output: ");
  console.log(out.stdout);
  console.log("Errors: ", out.stderr === "" ? 0 : out.stderr);
});

async function getConsoleOutput(fileName) {
  const output = await exec(`node ${fileName}`);
  return output;
}
