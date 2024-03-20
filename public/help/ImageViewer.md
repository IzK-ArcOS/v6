<h1 class="image-header">
  <img src="#ImageViewerIcon" alt="icon"/>
  <span>Image Viewer</span>
</h1>

With Image Viewer you can view any image file on ArcOS, even ArcOS icons if you do some trickery in ArcTerm. In this article, you'll learn:

- How to open the Image Viewer
- How to apply an opened image as desktop wallpaper

## Opening Image Viewer

Opening it is quite easy. you can open Image Viewer using one of these interactive options:

1. ### Start Menu / Desktop

   The Image Viewer icon appears on the desktop or in the Start Menu.

2. ### Launching it from ArcTerm (Technical)

   You can also use the `spawn` command in [ArcTerm](@client/help/ArcTerm.md) to open Image Viewer:

   ```
   ~/ $ spawn ImageViewer ["PATH"]
   ```

   where you can optionally put the path to a file to open in place of `PATH`. If you don't want to specify a file, you can simply remove the `["PATH"]` part of the command.

## Applying image as desktop wallpaper

To apply any image from your account as desktop wallpaper, first open the image in Image Viewer by double-clicking it in File Manager or by selecting it via the Open File dialog in Image Viewer. Then, go to **File** -> **Set as wallpaper**. The wallpaper will then be applied to your desktop.
