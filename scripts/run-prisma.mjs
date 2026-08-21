import { spawnSync } from "node:child_process";

const action = process.argv[2];
if (!new Set(["generate", "validate"]).has(action)) {
  throw new Error("Usage: node scripts/run-prisma.mjs <generate|validate>");
}

const prismaBinary = process.platform === "win32" ? "node_modules/prisma/build/index.js" : "node_modules/.bin/prisma";
const command = process.platform === "win32" ? process.execPath : prismaBinary;
const args = process.platform === "win32" ? [prismaBinary, action] : [action];
const result = spawnSync(command, args, {
  env: {
    ...process.env,
    DATABASE_URL:
      process.env.DATABASE_URL ||
      "postgresql://veridian:veridian@127.0.0.1:5432/veridian?schema=public",
  },
  stdio: "inherit",
  shell: false,
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
