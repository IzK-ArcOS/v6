import { maxZIndex } from "$ts/stores/apps";
import { UserDataStore } from "$ts/stores/user";
import { App } from "$types/app";

export function generateCSS(app: App) {
  if (!app || app.metadata.core) return "";

  let cssString = "";

  // Following 6 lines are to account for headless window sizes
  let minHeight = app.minSize.h + 40;
  let maxHeight = app.maxSize.h + 40;
  let height = app.size.h + 40;
  if (app.isOverlay || app.state.headless) minHeight -= 40;
  if (app.isOverlay || app.state.headless) maxHeight -= 40;
  if (app.isOverlay || app.state.headless) height -= 40;
  // Those were the 6 lines. Have fun.

  cssString += `min-width: ${app.minSize.w}px;`;
  cssString += `min-height: ${minHeight}px;`;
  cssString += `max-width: ${app.maxSize.w}px;`;
  cssString += `max-height: ${maxHeight}px;`;
  cssString += `width: ${app.size.w}px;`;
  cssString += `height: ${height}px;`;

  if (!app.isOverlay) cssString += `z-index: ${maxZIndex.get() + 1}`;

  return cssString;
}
