import { Log } from "$ts/console";
import { UploadIcon } from "$ts/images/general";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { Plural as P, sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { AxiosProgressEvent } from "axios";
import { arrayToBlob } from "../convert";
import { writeFile } from "../file";
import { FileProgress } from "../progress";
import { pathToFriendlyName } from "../util";

export async function directUploadProgressy(path: string, multi = false, pid?: number, accept?: string) {
  if (path.endsWith("/")) path.slice(0, -1);

  const uploader = document.createElement("input");

  uploader.type = "file";
  uploader.accept = accept;
  uploader.multiple = multi;

  const target = Store<string>();

  uploader.onchange = async () => {
    const files = uploader.files;

    if (!files.length) target.set(path);

    if (!multi) {
      const file = uploader.files[0];

      target.set(await fileUploadProgressy(file, path, pid));

      return;
    }

    await multipleFileUploadProgressy(uploader.files, path, pid)

    target.set(path)
  };

  uploader.click();

  return new Promise<string>((resolve) => {
    target.subscribe((v) => {
      if (!v) return;

      resolve(v);
    });
  });
}

export async function fileUploadProgressy(file: File, dir: string, pid?: number, noShade = false) {
  Log(
    "server/fs/upload/progress",
    `Uploading ${file.name} to ${dir}`,
  );

  const { setMax, setDone, mutErr } = await FileProgress({
    type: "size",
    caption: `Uploading ${file.name}`,
    subtitle: `To ${dir}`,
    max: file.size,
    done: 0,
    icon: UploadIcon,
    working: true,
    waiting: false,
    errors: 0
  }, pid, noShade)

  const content = arrayToBlob(await file.arrayBuffer());
  const path = `${dir}/${file.name}`.split("//").join("/");
  const valid = await writeFile(path, content, false, (p: AxiosProgressEvent) => {
    setDone(p.loaded);
    setMax(p.total)
  });

  if (!valid) mutErr(+1);

  GlobalDispatch.dispatch("fs-flush")

  if (!valid) return "";

  return path;
}

export async function multipleFileUploadProgressy(files: FileList, dir: string, pid?: number, noShade = false): Promise<boolean> {
  Log("server/fs/upload", `Uploading ${files.length} files to ${dir}`);

  let total = 0;

  for (const file of files) {
    total += file.size;
  }

  const { updSub, mutDone, setWork, setWait, mutErr } = await FileProgress({
    type: "size",
    caption: `Uploading ${files.length} ${P("file", files.length)} to ${pathToFriendlyName(dir)}`,
    subtitle: `To ${dir}`,
    max: total + 100,
    done: 0,
    icon: UploadIcon,
    working: false,
    waiting: true,
    errors: 0
  }, pid, noShade)

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const content = arrayToBlob(await file.arrayBuffer())
    const path = `${dir}/${file.name}`.replaceAll("//", "/");

    updSub(`(${i + 1} / ${files.length}) ${file.name}`);

    setWait(false);
    setWork(true);

    const written = await writeFile(path, content, false, (p: AxiosProgressEvent) => {
      mutDone(p.bytes);
    });

    if (!written) mutErr(+1)

    setWork(false);
    setWait(true);

    await sleep(55) // rate-limit cooldown
  }

  mutDone(+200);

  GlobalDispatch.dispatch("fs-flush")

  return true
}