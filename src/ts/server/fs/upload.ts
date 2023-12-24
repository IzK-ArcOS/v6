import { Log } from "$ts/console";
import { Store } from "$ts/writable";
import { arrayToBlob } from "./convert";
import { writeFile } from "./file";

export async function directSingleUpload(path: string, accept?: string) {
  if (path.endsWith("/")) path.slice(0, -1);
  const uploader = document.createElement("input");

  uploader.type = "file";
  uploader.accept = accept;

  const target = Store<string>();

  uploader.onchange = async () => {
    const files = uploader.files;

    if (!files.length) target.set("");

    const file = uploader.files[0];

    target.set(await fileUpload(file, path));
  };

  uploader.click();

  return new Promise<string>((resolve) => {
    target.subscribe((v) => {
      if (!v) return;

      resolve(v);
    });
  });
}

async function fileUpload(file: File, dir: string): Promise<string> {
  Log(
    "server/fs/upload",
    `Uploading ${file.name} to ${dir}`,
  );

  const content = arrayToBlob(await file.arrayBuffer());
  const path = `${dir}/${file.name}`.split("//").join("/");
  const valid = await writeFile(path, content);

  if (!valid) return "";

  return path;
}
