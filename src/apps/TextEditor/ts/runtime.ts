import { AppRuntime } from "$ts/apps/runtime";
import { Process } from "$ts/process";
import { textToBlob } from "$ts/server/fs/convert";
import { readFile, writeFile } from "$ts/server/fs/file";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import { ArcFile } from "$types/fs";

export class Runtime extends AppRuntime {
  public File = Store<ArcFile>();
  public buffer = Store<string>();
  public path = Store<string>();

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    this.openedFile.subscribe(async (v) => {
      if (!v) return;

      this.path.set(v);

      const file = await readFile(v);

      if (!file) return;

      this.buffer.set(await file.data.text())

      this.File.set(file);
    })
  }

  public async save(content: string) {
    const path = this.path.get();
    const file = this.File.get();
    const written = await writeFile(path, textToBlob(content, file ? file.mime : null));

    if (!written) console.log("write failed!")

    return !!written;
  }
}