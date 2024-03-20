<h1 class="image-header">
  <img src="#TextEditorIcon" alt="icon"/>
  <span>Writer</span>
</h1>

Writer is the text editor of ArcOS. From it you can view and edit every file on your ArcOS account. It can also open client-files, such as help articles, to view their source in read-only mode. In this article, you'll learn:

- How to open Writer
- what the base supported file types are
- about the View options

## Opening Writer

Opening it is quite easy. you can open Writer using one of these interactive options:

1. ### Start Menu / Desktop

   The Writer icon appears on the desktop or in the Start Menu.

2. ### Launching it from ArcTerm (Technical)

   You can also use the `spawn` command in [ArcTerm](@client/help/ArcTerm.md) to open Writer:

   ```
   ~/ $ spawn TextEditor ["PATH"]
   ```

   where you can optionally put the path to a file to open in place of `PATH`. If you don't want to specify a file, you can simply remove the `["PATH"]` part of the command.

## Base supported filetypes

Writer can open any file you desire, although these are the officially supported file extensions:

| Icon                      | Name                | Extension       | Description                                             |
| ------------------------- | ------------------- | --------------- | ------------------------------------------------------- |
| ![icon](#TextMimeIcon)    | Plain Text          | `.txt`, `.text` | Used for writing basic information in plain-text format |
| ![icon](#FileIcon)        | Configuration File  | `.conf`         | Used for storing application configuration options      |
| ![icon](#JsonMimeIcon)    | JSON File           | `.json`         | JavaScript Object Notation-file                         |
| ![icon](#ArcTermMimeIcon) | ArcTerm Script File | `.arcterm`      | Contains ArcTerm scripts that can be executed           |

<br/>

## View Options

In the View menu of Writer, you can select various view options to help in your writing adventures. Here they are:

- Enable **Fixed-width font** to display the file using a Monospace font (Source Code Pro)
- **Word Wrap** enables automatic line wrapping when a line is longer than the width of the window
- **Error checking** enables the built-in error checking of the browser/desktop app you're running ArcOS on.
- The **Status Bar** is visible when a file is opened and contains handy information about the file.
- Clicking **Show Markdown preview** will open the file in Markdown Viewer. This requires the file to end in `.md`.
