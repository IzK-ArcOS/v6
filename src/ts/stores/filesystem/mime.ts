import { ArcAppMimeIcon, ArcTermMimeIcon, ArcThemeMimeIcon, AudioMimeIcon, CompressMimeIcon, ImageMimeIcon, JsonMimeIcon, PdfMimeIcon, SvgMimeIcon, TextMimeIcon } from "$ts/images/mime";

export const MimeTypeIcons: Record<string, string[]> = { // <icon, .ext>
  [ArcAppMimeIcon]: [".appmod"],
  [JsonMimeIcon]: [".json"],
  [PdfMimeIcon]: [".pdf"],
  [SvgMimeIcon]: [".svg"],
  [CompressMimeIcon]: [".zip", ".tar.xz", ".7z", ".rar"],
  [AudioMimeIcon]: [".mp3", ".opus", ".wav", ".m4a", ".flac"],
  [ImageMimeIcon]: [".png", ".jpg", ".gif", ".webp", ".ico", ".bmp", ".tif", ".tiff"],
  [TextMimeIcon]: [".txt"],
  [ArcTermMimeIcon]: ["arcterm.conf"],
  [ArcThemeMimeIcon]: [".arctheme"]
}