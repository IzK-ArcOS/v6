import { Log } from "$ts/console";
import { ProcessHandler } from "$ts/process";
import { PrimaryState } from "$ts/states";
import { focusedPid } from "$ts/stores/apps";
import { bannedKeys } from "$ts/stores/apps/keyboard";
import { AppKeyCombinations } from "$types/accelerator";
import { LogLevel } from "$types/console";

export class AcceleratorHandler {
  public store: [number, AppKeyCombinations][] = [];

  constructor(public handler: ProcessHandler) {
    this.Log(`Creating new AcceleratorHandler on ProcessHandler ${this.handler.id}`);
    this.startListener();
  }

  public Log(message: string, level?: LogLevel) {
    Log("apps/keyboard", `AcceleratorHandler[${this.handler.id}]: ${message}`, level)
  }

  public register(pid: number) {
    this.Log(`Registering shortcuts for PID ${pid}`);
    const exists = this.handler.isPid(pid, true);

    if (!exists || this.isRegistered(pid)) return false;

    const process = this.handler.getProcess(pid);

    if (!process.app || !process.app.accelerators) return false;

    this.store.push([pid, process.app.accelerators]);

    return true;
  }

  public isRegistered(pid: number): boolean {
    for (let i = 0; i < this.store.length; i++) {
      if (this.store[i][0] == pid) return true;
    }

    return false;
  }

  public startListener() {
    document.addEventListener("keydown", (e) => this.processor(e))
  }

  public stopListener() {
    document.removeEventListener("keydown", (e) => this.processor(e))
  }

  private processor(e: KeyboardEvent) {
    if (!e.key) return;

    if (bannedKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();

      return false;
    }

    this.unfocusActiveElement();

    const state = PrimaryState.current.get().key;

    if (state != "desktop") return;

    for (let i = 0; i < this.store.length; i++) {
      const entry = this.store[i];
      const combos = entry[1];
      const pid = entry[0];
      const process = this.handler.getProcess(pid);

      if (!process || process._disposed) continue;

      for (let j = 0; j < combos.length; j++) {
        const combo = combos[j];

        const alt = combo.alt ? e.altKey : true;
        const ctrl = combo.ctrl ? e.ctrlKey : true;
        const shift = combo.shift ? e.shiftKey : true;
        /** */
        const modifiers = alt && ctrl && shift;
        /** */
        const pK = e.key.toLowerCase().trim();
        const key = combo.key.trim().toLowerCase();
        /** */
        const isFocused = focusedPid.get() == pid || combo.global;

        if (!modifiers || (key != pK && key) || !isFocused) continue;

        combo.action(process);
      }
    }
  }

  public unfocusActiveElement() {
    const el = document.activeElement as HTMLButtonElement;

    if (
      !el ||
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement
    )
      return;

    el.blur();
  }
}