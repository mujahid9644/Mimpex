import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  path.join(root, ".next"),
  path.join(root, "node_modules", ".cache"),
];

for (const dir of targets) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Removed: ${path.relative(root, dir)}`);
  } catch {
    /* ignore */
  }
}

console.log("Clean complete. Run: npm run dev");
