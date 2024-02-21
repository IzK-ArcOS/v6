import { ThemesIcon } from "$ts/images/general";
import { tryJsonConvert } from "$ts/json";
import { loadTheme } from "$ts/themes";
import { FileHandler } from "$types/fs";
import { UserTheme } from "$types/theme";
import { readFile } from "..";

export const ThemeHandler: FileHandler = {
  extensions: [".arctheme"],
  name: "Apply Theme",
  image: ThemesIcon,
  description: "Apply this ArcOS theme",
  async handler(file) {
    const arcfile = await readFile(file.scopedPath);

    if (!arcfile) return;

    const content = await arcfile.data.text();
    const json = tryJsonConvert(content) as UserTheme;

    if (!json || typeof json !== "object") return;

    loadTheme(json);
  },
};
