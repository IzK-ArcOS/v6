import { TextEditorIcon } from "$ts/images/apps";
import { ThemesIcon } from "$ts/images/general";
import { tryJsonConvert } from "$ts/json";
import { readFile } from "$ts/server/fs/file";
import { openFileWithApp } from "$ts/server/fs/open";
import { loadTheme } from "$ts/themes";
import { FileHandler } from "$types/fs";
import { UserTheme } from "$types/theme";

export const FileHandlers: FileHandler[] = [
  {
    extensions: [".txt"],
    name: "Text Editor",
    image: TextEditorIcon,
    description: "Open the file in the Text Editor",
    handler(file) {
      openFileWithApp("TextEditor", file);
    }
  },
  {
    extensions: [".arctheme"],
    name: "Apply Theme",
    image: ThemesIcon,
    description: "Apply this ArcOS theme",
    async handler(file) {
      const arcfile = await readFile(file.scopedPath);

      if (!arcfile) return;

      const content = await arcfile.data.text();
      const json = tryJsonConvert(content) as UserTheme;

      if (typeof json !== "object") return;

      loadTheme(json)
    }
  }
]