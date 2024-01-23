import { Log } from "$ts/console";
import { AxiosProgressEvent } from "axios";
import { arrayToBlob } from "../convert";
import { writeFile } from "../file";
import { CreateFileProgress } from "../progress";
import { UploadIcon } from "$ts/images/general";
import { Plural as P, sleep } from "$ts/util";
import { pathToFriendlyName } from "../util";
import { GlobalDispatch } from "$ts/process/dispatch/global";

export async function fileUploadProgressy(file: File, dir: string) {
  Log(
    "server/fs/upload/progress",
    `Uploading ${file.name} to ${dir}`,
  );

  const { setMax, setDone } = await CreateFileProgress({
    type: "size",
    caption: `Uploading ${file.name}...`,
    subtitle: `To ${dir}`,
    max: file.size,
    done: 0,
    icon: UploadIcon
  })

  const content = arrayToBlob(await file.arrayBuffer());
  const path = `${dir}/${file.name}`.split("//").join("/");
  const valid = await writeFile(path, content, false, (p: AxiosProgressEvent) => {
    setDone(p.loaded);
    setMax(p.total)
  });

  GlobalDispatch.dispatch("fs-flush")

  if (!valid) return "";

  return path;
}

export async function multipleFileUploadProgressy(files: FileList, dir: string): Promise<boolean> {
  Log("server/fs/upload", `Uploading ${files.length} files to ${dir}`);

  let total = 0;

  for (const file of files) {
    total += file.size;
  }

  const { updateSubtitle, mutateDone } = await CreateFileProgress({
    type: "size",
    caption: `Uploading ${files.length} ${P("file", files.length)} to ${pathToFriendlyName(dir)}`,
    subtitle: `To ${dir}`,
    max: total + 100,
    done: 0,
    icon: UploadIcon
  })

  for (const file of files) {
    const content = arrayToBlob(await file.arrayBuffer())
    const path = `${dir}/${file.name}`.replaceAll("//", "/");

    updateSubtitle(file.name);

    const valid = await writeFile(path, content, false, (p: AxiosProgressEvent) => {
      mutateDone(p.bytes);
    });

    updateSubtitle(`${file.name} ${valid ? "..." : "(!!)"}`);

    await sleep(350) // rate-limit cooldown
  }

  mutateDone(+200);

  GlobalDispatch.dispatch("fs-flush")

  return true
}