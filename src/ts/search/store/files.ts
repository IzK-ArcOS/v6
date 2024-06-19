import { GlobalDispatch } from "$ts/process/dispatch/global";
import { OpenFile } from "$ts/server/fs/file/handler";
import { GetFilesystemTree } from "$ts/server/fs/file/tree";
import { getMimeIcon } from "$ts/server/fs/mime";
import { pathToFriendlyPath } from "$ts/server/fs/util";
import { SearchItem } from "$types/search";

let FILE_CACHE: SearchItem[] = [];

GlobalDispatch.subscribe("fs-flush", () => (FILE_CACHE = []));

export async function compileSearchableFiles() {
  if (FILE_CACHE.length && FILE_CACHE[0]) return FILE_CACHE;

  const files = await GetFilesystemTree();
  const result: SearchItem[] = [];

  for (const file of files) {
    result.push({
      caption: file.filename,
      action: async () => {
        OpenFile(file);
      },
      description: `${pathToFriendlyPath(file.scopedPath)}`,
      image: getMimeIcon(file.filename),
    });
  }

  FILE_CACHE = result;

  return result;
}
