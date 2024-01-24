import { ArcFile } from "$types/fs";

export function DownloadFile(file: ArcFile) {
  if (!file || !file.data) return;

  const blob = file.data;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = file.name;
  anchor.target = "_blank";
  anchor.click();
  anchor.remove();
}
