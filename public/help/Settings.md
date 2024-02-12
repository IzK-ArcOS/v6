<h1 class="image-header">
  <img src="#SettingsIcon" alt="icon" />
  <span>
    The Settings App
  </span>
</h1>

From here you can manage all your ArcOS settings, conveniently put in one place. The settings app consists of pages. Each page is a category of different settings you can change. Each setting updates immediately, so there's no need to hit save on anything. From visual settings to app management, it's all in here.

![icon](#InfoIcon) In this article, we'll go over the basics of the settings you can change.

## Table of contents

- Opening the settings app
- What pages are there?
- [Managing your account](@client/help/Settings/account.md)
- [Changing the theme](@client/help/Settings/themes.md)
- [The Desktop Wallpaper](@client/help/Settings/wallpaper.md)
- [The Login Background](@client/help/Settings/login.md)
- [Changing visual aspects](@client/help/Settings/visuals.md)
- [The Shell](@client/help/Settings/shell.md)
- [Changing Windows](@client/help/Settings/windows.md)
- [Apps](@client/help/Settings/apps.md)

## Opening the settings app

Opening it is quite easy. The easiest method is by simply pressing the `Alt`+`Shift`+`I` keyboard shortcut. Pressing these will either open or focus the Settings app. Alternatively, you can open Settings using one of these interactive options:

1. ### Pressing the settings gear

   The Settings gear is located in both the Start Menu and Action Center:
   <br/>

   ![Settings gear in the start menu](@client/help/assets/settings-gear-start-menu.png)

   <br/>

   ![Settings gear in the action center](@client/help/assets/settings-gear-action-center.png)

2. ### Launching it from ArcTerm (Technical)

   You can also use the `spawn` command in [ArcTerm](@client/help/ArcTerm.md) to open the Settings App:

   ```
   ~/ $ spawn SettingsApp ["PAGE_ID"]
   ```

   where you can optionally put a page ID to open in place of `PAGE_ID`. If you don't want to specify a page ID, you can simply remove the `["PAGE_ID"]` part from the command.

## What pages are there?

Here is a table of all the settings pages, along with their IDs for the `spawn` arguments.

| Icon                          | Name             | ID          | Description                                                |
| ----------------------------- | ---------------- | ----------- | ---------------------------------------------------------- |
| ![icon](#AccountIcon)         | Account          | `account`   | Manage your account-related settings here.                 |
| ![icon](#ThemesIcon)          | Themes           | `themes`    | Change your theme, accent color and visual style.          |
| ![icon](#DesktopIcon)         | Wallpaper        | `wallpaper` | Change your desktop wallpaper.                             |
| ![icon](#PasswordIcon)        | Login Background | `login`     | Change your login background.                              |
| ![icon](#PersonalizationIcon) | Visuals          | `visuals`   | Change animations, transparency and other visual settings. |
| ![icon](#TaskbarIcon)         | Shell            | `shell`     | Manage your start menu, taskbar and more.                  |
| ![icon](#WindowSettingsIcon)  | Windows          | `windows`   | Change your window titlebar                                |
| ![icon](#AppsIcon)            | Apps             | `apps`      | List, disable and manage applications                      |
| ![icon](#ReleaseLogo)         | About            | `about`     | Display information about ArcOS                            |
