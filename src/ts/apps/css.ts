import { maxZIndex } from "$ts/stores/apps";
import { App } from "$types/app";

export function generateCSS(app: App) {
  if (!app || app.metadata.core) return "";

  let cssString = "";

  cssString += `min-width: ${app.minSize.w}px;`;
  cssString += `min-height: ${app.minSize.h}px;`;
  cssString += `max-width: ${app.maxSize.w}px;`;
  cssString += `max-height: ${app.maxSize.h}px;`;
  cssString += `width: ${app.size.w}px;`;
  cssString += `height: ${app.size.h}px;`;
  if (!app.isOverlay) cssString += `z-index: ${maxZIndex.get() + 1}`;

  return cssString;
}
