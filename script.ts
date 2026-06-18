import fs from "fs";
import path from "path";

const dir = "src/components";

function walk(directory: string) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      
      // Basic text color adjustments
      content = content.replace(/text-white/g, "text-text-main");
      // Basic bg color adjustments
      content = content.replace(/bg-white\/5/g, "bg-surface");
      content = content.replace(/bg-white\/10/g, "bg-surface-hover");
      // Basic border color adjustments
      content = content.replace(/border-white\/5/g, "border-border");
      content = content.replace(/border-white\/10/g, "border-border");
      content = content.replace(/text-gray-300/g, "text-text-muted");
      content = content.replace(/text-gray-400/g, "text-text-muted");
      content = content.replace(/text-gray-500/g, "text-text-muted");

      fs.writeFileSync(fullPath, content);
    }
  }
}

walk(dir);
console.log("Done upgrading CSS utility classes");
