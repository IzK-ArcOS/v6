import {
  ArcAppMimeIcon,
  ArcTermMimeIcon,
  ArcThemeMimeIcon,
  AudioMimeIcon,
  CompressMimeIcon,
  ImageMimeIcon,
  JavascriptMimeIcon,
  JsonMimeIcon,
  MarkdownMimeIcon,
  PdfMimeIcon,
  SvgMimeIcon,
  TextMimeIcon,
  VideoMimeIcon,
  WebpageMimeIcon,
  XmlMimeIcon
} from "$ts/images/mime";

export const MimeTypeIcons: Record<string, string[]> = { // <icon, .ext>
  [ArcAppMimeIcon]: [".appmod"],
  [JsonMimeIcon]: [".json"],
  [PdfMimeIcon]: [".pdf"],
  [SvgMimeIcon]: [".svg"],
  [CompressMimeIcon]: [".zip", ".tar.xz", ".7z", ".rar"],
  [AudioMimeIcon]: [".mp3", ".opus", ".wav", ".m4a", ".flac"],
  [ImageMimeIcon]: [".png", ".jpg", ".gif", ".webp", ".ico", ".bmp", ".tif", ".tiff"],
  [TextMimeIcon]: [".txt"],
  [ArcTermMimeIcon]: ["arcterm.conf", ".arcterm"],
  [ArcThemeMimeIcon]: [".arctheme"],
  [MarkdownMimeIcon]: [".md"],
  [VideoMimeIcon]: [".mp4", ".mkv", ".mov", ".avi"],
  [WebpageMimeIcon]: [".html", ".htm"],
  [JavascriptMimeIcon]: [".js", ".ts", ".d.ts", ".mjs"],
  [XmlMimeIcon]: [".xml"]
}