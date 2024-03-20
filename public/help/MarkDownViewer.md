<h1 class="image-header">
  <img src="#MarkdownMimeIcon" alt="icon"/>
  <span>Markdown Viewer</span>
</h1>

Markdown is everywhere in ArcOS. Even the help article you're reading right now is written in Markdown, and displayed using ArcOS' `MarkDownRenderer`. With Markdown Viewer you can view any Markdown file on ArcOS, even Help articles if you do some trickery in ArcTerm. In this article, you'll learn:

- How to open the Markdown Viewer
- What you can do with an opened markdown file

## Opening Markdown Viewer

Opening it is quite easy. you can open Markdown Viewer using one of these interactive options:

1. ### Start Menu / Desktop

   The Markdown Viewer icon appears on the desktop or in the Start Menu.

2. ### Launching it from ArcTerm (Technical)

   You can also use the `spawn` command in [ArcTerm](@client/help/ArcTerm.md) to open Markdown Viewer:

   ```
   ~/ $ spawn MarkdownViewer ["PATH"]
   ```

   where you can optionally put the path to a file to open in place of `PATH`. If you don't want to specify a file, you can simply remove the `["PATH"]` part of the command.

## Opening the file in something else

You can choose to open the Markdown file in Writer by going to **File** -> **Edit file**. This does require a file to be opened.

You can also click **File** -> **Open with** to open the file in any other available application in ArcOS.
