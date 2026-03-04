import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const testsDir = resolve("dist-test", "__tests__");
const testFiles = readdirSync(testsDir)
  .filter((file) => file.endsWith(".test.js"))
  .sort()
  .map((file) => join(testsDir, file));

if (testFiles.length === 0) {
  console.error(`No compiled tests found in ${testsDir}`);
  process.exit(1);
}

const result = spawnSync(process.execPath, ["--test", ...testFiles], {
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
