import { lstatSync } from "fs";
import { readdir, writeFile } from "fs/promises";
import humanFiletypes from "human-filetypes";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function GenerateAssetList() {
  console.log("v6 GAL: Now running... Hang on...");

  const result = [];
  const structure = await readdir(join(__dirname, "../dist/assets"));

  for (const item of structure) {
    const path = join(__dirname, "../dist/assets", item);
    const mime = humanFiletypes.fromExtension(extname(item));
    const stat = lstatSync(path);
    const size = stat.size;
    const created = stat.ctimeMs;
    const modified = stat.mtimeMs;

    console.log(`   ->   ${item} ${mime}`);

    result.push({
      filename: item.replace(/\-(?:[a-z0-9]+)\./g, "."),
      scopedPath: `@client/assets/${item}`,
      size,
      mime,
      dateCreated: created,
      dateModified: modified,
    });
  }

  console.log(`v6 GAL: Writing build time to ../dist/timestamp`);

  writeFile(join(__dirname, "../dist/timestamp"), new Date().getTime().toString(), {
    encoding: "utf-8",
  });

  console.log(`v6 GAL: Writing files index to ../dist/files.json`);

  writeFile(join(__dirname, "../dist/files.json"), JSON.stringify(result, null, 2), {
    encoding: "utf-8",
  });
}

GenerateAssetList();
