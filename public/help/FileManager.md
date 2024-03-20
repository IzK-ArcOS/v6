<h2 class="image-header">
  <img src="#FileManagerIcon" alt="icon"/>
  <span>The File Manager</span>
</h2>

With the File Manager, you can store and access your own personal files on ArcOS. From it you can create files, create folders, copy, move and delete items, upload and download files to and from your account, and open files in various ArcOS applications. In this article you'll learn:

- How to open the File Manager
- [What system folders are](@client/help/FileManager/SystemFolder.md)
- [How to create folders and files](@client/help/FileManager/CreateFileFolder.md)
- [How to upload/download files](@client/help/FileManager/Uploading.md)
- [How to open files in other applications](@client/help/FileManager/Opening.md)

## Opening the File Manager

Opening the File Manager can be done in a bunch of different ways:

1. ### Right-clicking the desktop

   You can open the File Manager by right-clicking the desktop, and selecting **File Manager** in the menu that appears

2. ### Start menu system folders

   You can also click on any link in right panel of the Start Menu to open the File Manager in the respective system folder.

3. ### Regular app shortcuts

   You can open the File Manager by clicking it in the left panel of the Start Menu or on the Desktop.

4. ### Launching it from ArcTerm (technical)

   You can also use the `spawn` command in [ArcTerm](@client/help/ArcTerm.md) to open the File Manager:

   ```
   ~/ $ spawn FileManager ["FOLDER_PATH","SELECTED_FILE_PATH"]
   ```

   where you can optionally specify what folder to open and the file to select. You can can omit these by leaving out the `["FOLDER_PATH","SELECTED_FILE_PATH"]` part of the command. Example:

   ```
   ~/ $ spawn FileManager ["./Pictures","./Pictures/Cute_Dog.png"]
   ```
