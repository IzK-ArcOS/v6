import { AppsVirtualFolder } from "$ts/server/fs/virtual/apps";
import { ArcTermVirtualFolder } from "$ts/server/fs/virtual/arcterm";
import { DesktopAppIcons } from "$ts/server/fs/virtual/desktop";
import { HelpVirtualFolder } from "$ts/server/fs/virtual/help";
import { PowerVirtualFolder } from "$ts/server/fs/virtual/power";
import { ServersVirtualFolder } from "$ts/server/fs/virtual/servers";
import { ServicesVirtualFolder } from "$ts/server/fs/virtual/services";
import { SettingsVirtualFolder } from "$ts/server/fs/virtual/settings";
import { FilesystemShortcuts } from "$ts/server/fs/virtual/shortcuts";
import { StatesVirtualFolder } from "$ts/server/fs/virtual/states";
import { SystemVirtualFolder } from "$ts/server/fs/virtual/system";
import { Store } from "$ts/writable";
import { VirtualDirectory, VirtualFsStoreNode } from "$types/fs";

export const VirtualFilesystemStore = Store<VirtualDirectory[]>([]);
export const VirtualFilesystemSuppliers = Store<VirtualFsStoreNode[]>([
  { callback: SystemVirtualFolder, caption: "ArcOS Folder" },
  { callback: HelpVirtualFolder, caption: "Help Articles" },
  { callback: AppsVirtualFolder, caption: "Applications" },
  { callback: SettingsVirtualFolder, caption: "Settings App Pages" },
  { callback: ArcTermVirtualFolder, caption: "ArcTerm Commands" },
  { callback: ServicesVirtualFolder, caption: "Services" },
  { callback: PowerVirtualFolder, caption: "Power Functions" },
  { callback: StatesVirtualFolder, caption: "ArcOS States" },
  { callback: ServersVirtualFolder, caption: "Saved Servers" },
  { callback: FilesystemShortcuts, caption: "Shortcuts" },
  { callback: DesktopAppIcons, caption: "Desktop App Icons" },
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
