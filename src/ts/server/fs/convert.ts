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
