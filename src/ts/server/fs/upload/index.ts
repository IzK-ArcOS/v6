import { Log } from "$ts/console";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { arrayToBlob } from "../convert";
import { writeFile } from "../file";
import { fileUploadProgressy, multipleFileUploadProgressy } from "./progress";

export async function directSingleUpload(
  path: string,
  multi = false,
  pid?: number,
  accept?: string
) {
  if (path.endsWith("/")) path.slice(0, -1);

  const uploader = document.createElement("input");

  uploader.type = "file";
  uploader.accept = accept;
  uploader.multiple = multi;

  const target = Store<string>();

  uploader.onchange = async () => {
    const files = uploader.files;

    if (!files.length) target.set("");

    if (!multi) {
      const file = uploader.files[0];

      target.set(await fileUploadProgressy(file, path, pid));

      return;
    }

    await multipleFileUploadProgressy(uploader.files, path, pid);

    target.set(path);
  };

  uploader.click();

  return new Promise<string>((resolve) => {
    target.subscribe((v) => {
      if (!v) return;

      resolve(v);
    });
  });
}

export async function fileUpload(file: File, dir: string): Promise<string> {
  Log("server/fs/upload", `Uploading ${file.name} to ${dir}`);

  const content = arrayToBlob(await file.arrayBuffer());
  const path = `${dir}/${file.name}`.split("//").join("/");
  const valid = await writeFile(path, content);

  if (!valid) return "";

  return path;
}

export async function multipleFileUpload(files: FileList, dir: string): Promise<boolean> {
  Log("server/fs/upload", `Uploading ${files.length} files to ${dir}`);

  for (const file of files) {
    const content = arrayToBlob(await file.arrayBuffer());
    const path = `${dir}/${file.name}`.replaceAll("//", "/");
    const valid = await writeFile(path, content);

    if (!valid) return false;

    await sleep(55); // rate-limit cooldown
  }

  return true;
}
