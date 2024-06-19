import { HelpArticles } from "$ts/stores/articles";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function HelpVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const files = [];

  for (const [id, article] of Object.entries(HelpArticles)) {
    const now = new Date().getTime();

    const partial: PartialArcFile = {
      filename: `${id}.md`,
      scopedPath: article,
      size: id.length,
      mime: "application/markdown",
      dateCreated: now,
      dateModified: now,
      virtual: true,
    };

    files.push(partial);
  }

  return [
    {
      userPath: "ArcOS",
      data: {
        name: "Help",
        scopedPath: "ArcOS/Help",
        files,
        directories: [],
        virtual: true,
      },
    },
  ];
}
