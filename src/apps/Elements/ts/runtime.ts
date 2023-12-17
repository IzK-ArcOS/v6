import type { App } from "$types/app";
import { AppRuntime } from "$ts/apps";

export class Runtime extends AppRuntime {
  constructor(app: App) {
    super(app);
  }
}