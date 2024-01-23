import { TextEditorIcon } from "$ts/images/apps";
import { openFileWithApp } from "$ts/server/fs/open";
import { FileHandler } from "$types/fs";

export const FileHandlers: FileHandler[] = [
  {
    extensions: [".txt"],
    name: "Text Editor",
    image: TextEditorIcon,
    description: "Open the file in the Text Editor",
    handler(file) {
      openFileWithApp("TextEditor", file);
    }
  }
]