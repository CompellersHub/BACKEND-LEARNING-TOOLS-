import { Container } from "typedi";
import fs from "fs";
import path from "path";

/**
 * Recursively walk through folders to find all `model/` directories and auto-register models
 */
function walkAndRegisterModels(dir: string) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (item === "model") {
        // Found a model folder, load all files inside
        fs.readdirSync(fullPath).forEach((file) => {
          if (
            (file.endsWith(".ts") || file.endsWith(".js")) &&
            !file.endsWith(".d.ts")
          ) {
            const modelFile = require(path.join(fullPath, file));
            for (const key in modelFile) {
              const exported = modelFile[key];
              if (
                typeof exported === "object" ||
                typeof exported === "function"
              ) {
                const token = key.charAt(0).toLowerCase() + key.slice(1);
                Container.set(token, exported);
              }
            }
          }
        });
      } else {
        // Recurse into subdirectories
        walkAndRegisterModels(fullPath);
      }
    }
  }
}

/**
 * Main entry to register all models
 */
export function registerAllModels() {
  const rootPath = path.join(__dirname);
  walkAndRegisterModels(rootPath);
}
