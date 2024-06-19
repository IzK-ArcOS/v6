import { AppsVirtualFolder } from "$ts/server/fs/virtual/apps";
import { HelpVirtualFolder } from "$ts/server/fs/virtual/help";
import { SystemVirtualFolder } from "$ts/server/fs/virtual/system";
import { Store } from "$ts/writable";
import { VirtualDirectory, VirtualFsStoreNode } from "$types/fs";

export const VirtualFilesystemStore = Store<VirtualDirectory[]>([]);
export const VirtualFilesystemSuppliers = Store<VirtualFsStoreNode[]>([
  { callback: SystemVirtualFolder, caption: "ArcOS Folder" },
  { callback: HelpVirtualFolder, caption: "Help Articles" },
  { callback: AppsVirtualFolder, caption: "Applications" },
]);

export const VirtualSystemFolderExpr: [string, RegExp, boolean][] = [
  ["System", /(.*?)\.(js|css|json)/g, true],
  ["Thumbnails", /(imgthumb[0-9]+)\.(png|jpg|jpeg)/g, false],
  ["Wallpapers", /(img[0-9]+)\.(png|jpg|jpeg)/g, false],
  ["Profiles", /([0-9]+)\.png/g, false],
  ["Branding", /(rc|esr|glow|devIcon|glowing|unstIcon|systemIcon)(.*?|)\.(png|jpg|svg)/g, true],
  ["Sounds", /(.*?)\.(wav|mp3)/g, true],
  ["Icons", /([a-zA-Z]+(.*?|).(png|svg))/g, true],
  ["Cursors", /(.*?)\.cur/g, true],
  ["Miscellaneous", /(.*?)\.([a-zA-Z])/g, false],
];

//\-([a-z0-9]+)\.
