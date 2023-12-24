import { fromBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { readFile } from "$ts/server/fs/file";
import { UserName } from "$ts/stores/user";
import { Wallpapers } from "$ts/stores/wallpaper";
import { LogLevel } from "$types/console";
import { Wallpaper } from "$types/wallpaper";

const getters: [string, (id: string) => Wallpaper | Promise<Wallpaper>][] = [
  [
    "@local:",
    async (id) => await wallpaperFromFS(fromBase64(id.replace("@local:", ""))),
  ],
  ["img", (id) => Wallpapers[id] || Wallpapers["img04"]],
];

export async function getWallpaper(id: string, override?: string): Promise<Wallpaper> {
  if (!id) return Wallpapers["img04"];

  if (id.startsWith("http")) return { author: "The Web", name: "From the Internet", url: id, thumb: id };

  for (let i = 0; i < getters.length; i++) {
    if (id.startsWith(getters[i][0])) return await getters[i][1](id);
  }

  return Wallpapers[override || "img04"];
}

export async function wallpaperFromFS(path: string): Promise<Wallpaper> {
  Log(
    "wallpaper",
    `Reading FS wallpaper from path "${path}"...`,
    LogLevel.info
  );

  const file = await readFile(path);

  if (!file) {
    Log(
      "wallpaper",
      `Unable to get wallpaper "${path}" from ArcFS`,
      LogLevel.error
    );

    return Wallpapers["img04"];
  }

  const url = URL.createObjectURL(file.data);

  return { url, thumb: url, author: UserName.get(), name: "Uploaded", source: "" };
}
