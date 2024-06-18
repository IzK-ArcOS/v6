import { PartialArcFile, VirtualDirectory, VirtualDirectorySupplierReturn } from "$types/fs";

export async function SystemVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  try {
    const json = (await (await fetch("./files.json")).json()) as PartialArcFile[];

    const grouped = groupByExtension(json);
    const virtuals: VirtualDirectory[] = [];
    const now = new Date().getTime();

    for (const [extension, files] of Object.entries(grouped)) {
      const name = extension.toUpperCase();

      virtuals.push({
        userPath: `System`,
        data: {
          name,
          scopedPath: `System/${name}`,
          files: files.map((f) => ({ ...f, virtual: true })),
          directories: [],
          virtual: true,
        },
      });
    }

    return [
      ...virtuals,
      {
        userPath: "./",
        data: {
          name: "System",
          scopedPath: "System",
          files: [
            {
              mime: "text/plain",
              filename: "mode",
              scopedPath: "@client/mode",
              size: 178,
              dateCreated: now,
              dateModified: now,
            },
            {
              mime: "text/plain",
              filename: "build",
              scopedPath: "@client/build",
              size: 178,
              dateCreated: now,
              dateModified: now,
            },
            {
              mime: "text/plain",
              filename: "files.json",
              scopedPath: "@client/files.json",
              size: JSON.stringify(json).length,
              dateCreated: now,
              dateModified: now,
            },
          ],
          directories: [],
          hidden: true,
          virtual: true,
        },
      },
    ];
  } catch {
    return null;
  }
}

function groupByExtension(files: PartialArcFile[]): Record<string, PartialArcFile[]> {
  let result: Record<string, PartialArcFile[]> = {};

  for (const file of files) {
    const split = file.filename.split(".");
    const extension = split[split.length - 1];

    if (!result[extension]) result[extension] = [file];
    else result[extension].push(file);
  }

  return result;
}
