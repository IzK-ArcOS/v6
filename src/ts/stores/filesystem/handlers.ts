import { ImageViewerHandler } from "$apps/ImageViewer/ts/handler";
import { MarkDownViewerHandler } from "$apps/MarkDownViewer/ts/handler";
import { MediaPlayerHandler } from "$apps/MediaPlayer/ts/handler";
import { TextEditorHandler } from "$apps/TextEditor/ts/handler";
import { DownloadHandler } from "$ts/server/fs/file/handlers/download";
import { ThemeHandler } from "$ts/server/fs/file/handlers/theme";
import { ZipHandler } from "$ts/server/fs/file/handlers/zip";
import { FileHandler } from "$types/fs";

export const FileHandlers: FileHandler[] = [
  TextEditorHandler,
  MarkDownViewerHandler,
  ImageViewerHandler,
  MediaPlayerHandler,
  ThemeHandler,
  DownloadHandler,
  ZipHandler,
];
