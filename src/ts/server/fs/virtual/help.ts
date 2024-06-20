import { GetHelp } from "$ts/help";
import { BUILD_TIMESTAMP } from "$ts/metadata/timestamp";
import { HelpArticles } from "$ts/stores/articles";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function HelpVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const files = [];

  for (const [id, article] of Object.entries(HelpArticles)) {
    const partial: PartialArcFile = {
      filename: `${id}.md`,
      scopedPath: article,
      size: id.length,
      mime: "application/markdown",
      dateCreated: BUILD_TIMESTAMP,
      dateModified: BUILD_TIMESTAMP,
      virtual: true,
      onOpen() {
        GetHelp(article);
      },
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
