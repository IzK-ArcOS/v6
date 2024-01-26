import { DownloadIcon } from "$ts/images/filesystem";
import { FileHandler } from "$types/fs";
import { readFile } from "..";
import { DownloadFile } from "../../download";

export const DownloadHandler: FileHandler = {
  extensions: ["*.*"],
  name: "Download File",
  description: "Download this file to your local machine.",
  image: DownloadIcon,
  async handler(file) {
    const arcfile = await readFile(file.scopedPath);

    DownloadFile(arcfile)
  }
}