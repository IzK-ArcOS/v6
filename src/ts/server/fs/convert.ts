import { Log } from "$ts/console";
import { ArcFile } from "$types/fs";

export function arrayToText(buffer: ArrayLike<number> | ArrayBufferLike) {
  return new TextDecoder().decode(new Uint8Array(buffer));
}

export async function blobToText(blob: Blob) {
  return await blob.text();
}

export function textToBlob(text: string, type = "text/plain"): Blob {
  return new Blob([text], { type });
}

export function arrayToBlob(buffer: ArrayBuffer, type = "text/plain"): Blob {
  return new Blob([new Uint8Array(buffer)], {
    type,
  });
}

export async function FileToArcFile(file: File, target: string, mime?: string): Promise<ArcFile> {
  Log("server/fs/convert", `Converting ${file.name} to ArcFile`);

  const data: ArcFile = {
    name: file.name,
    path: target,
    data: arrayToBlob(await file.arrayBuffer()),
    mime: mime || "text/plain",
  };

  return data;
}
