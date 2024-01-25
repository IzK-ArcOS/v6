import { Log } from "$ts/console";
import { Process } from "$ts/process";
import { PrimaryState } from "$ts/states";
import { focusedPid } from "$ts/stores/apps";
import { bannedKeys } from "$ts/stores/apps/keyboard";
import { AppKeyCombinations } from "$types/accelerator";
import { LogLevel } from "$types/console";

export class AcceleratorHandler {
  public store: AppKeyCombinations = [];

  constructor(public process: Process) {
    this.Log(`Creating new AcceleratorHandler for PID ${process.pid}`);

    if (!process.app || !process.app.accelerators) {
      this.Log("No app data to go off of! Assuming later injection.", LogLevel.warn);
    }

    this.store = this.process.app.accelerators || [];

    this.startListener();
  }

  public Log(message: string, level?: LogLevel) {
    Log("apps/keyboard", `AcceleratorHandler[${this.process.pid}]: ${message}`, level)
  }

  public startListener() {
    this.Log("Starting listener!");

    document.addEventListener("keydown", (e) => this.processor(e))
  }

  public stopListener() {
    this.Log("Stopping listener!", LogLevel.warn);

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

    for (const combo of this.store) {
      const alt = combo.alt ? e.altKey : true;
      const ctrl = combo.ctrl ? e.ctrlKey : true;
      const shift = combo.shift ? e.shiftKey : true;
      /** */
      const modifiers = alt && ctrl && shift;
      /** */
      const pK = e.key.toLowerCase().trim();
      const key = combo.key.trim().toLowerCase();
      /** */
      const isFocused = focusedPid.get() == this.process.pid || combo.global;

      if (!modifiers || (key != pK && key) || !isFocused) continue;

      combo.action(this.process);

      break;
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