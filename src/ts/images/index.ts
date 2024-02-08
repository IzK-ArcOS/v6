import { Log } from "$ts/console";

import * as Apps from "./apps";
import * as Branding from "./branding";
import * as Dialog from "./dialog";
import * as Filesystem from "./filesystem";
import * as General from "./general";
import * as Mimetypes from "./mime";
import * as Power from "./power";
import * as Status from "./status";
import * as Snapping from './snapping';

export function getAllImages(): Record<string, string> {
  return {
    ...Branding,
    ...General,
    ...Apps,
    ...Filesystem,
    ...Power,
    ...Dialog,
    ...Status,
    ...Snapping,
    ...Mimetypes
  };
}

export function getGroupedIcons() {
  return {
    Branding,
    Apps,
    Filesystem,
    Mimetypes,
    General,
    Dialog,
    Power,
    Status,
    Snapping
  };

}

export function getIconPath(id: string) {
  const icons = getAllImages();

  return icons[id] || Apps.DefaultIcon;
}