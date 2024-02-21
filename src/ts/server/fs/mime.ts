import { DefaultMimeIcon } from "$ts/images/mime";
import { MimeTypeIcons } from "$ts/stores/filesystem";

export function getMimeIcon(filename: string): string {
  filename = filename.toLowerCase();

  for (const icon in MimeTypeIcons) {
    const extensions = MimeTypeIcons[icon];

    for (const extension of extensions) {
      if (filename.endsWith(extension)) return icon;
    }
  }

  return DefaultMimeIcon;
}
