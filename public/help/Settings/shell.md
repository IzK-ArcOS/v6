# The Shell

The shell is probably the most important component of ArcOS. Without it, you wouldn't really be able to open applications or anything. The shell includes the **Start Menu**, **Taskbar** and **Action Center**.

Before you continue, first open the **Settings App**. More information about opening the settings app can be found in the [Settings](@client/help/Settings.md) article under **"Opening the settings app"**. Once opened, make sure you're on the **Shell** page by clicking on **Shell** in the sidebar.

Below you'll find an explanation for each of the Shell settings.

## Center Taskbar Buttons

Does what you would expect it to do. Enabling this setting will put the Opened Apps on your taskbar in the middle instead of on the left. However, the Start Button stays on the side.

## Taskbar Labels

Taskbar labels display the Window Title of the opened application. If you have a file opened in Writer, it'll show up in the taskbar as that name. Enabling this setting turns on the taskbar labels.

If the taskbar is in a vertical position, taskbar labels won't be visible.

## Taskbar Position

The taskbar be placed on any edge of your screen. To change where your taskbar is positioned, click on the desired position on the **Shell** page, next to the **Taskbar Position** text:
![large](@client/help/assets/settings-shell-taskbar-position.png)

The taskbar will then automatically change where it is on the screen.

## Accented start button

Enabling this setting will change your start button to match your accent color:

| Disabled                                                       | Enabled                                                       |
| -------------------------------------------------------------- | ------------------------------------------------------------- |
| ![medium](@client/help/assets/settings-shell-accented-off.png) | ![medium](@client/help/assets/settings-shell-accented-on.png) |

<br/>

## Start menu groups

Start groups are like folders in the start menu. They organize the start menu so that you can more easily open what you're looking for. However, it is possible to disable these groups and to just display a full list of apps instead. To do this, enable **Don't group start** on the Shell page. Here is a preview:

| With groups                                                       | Without groups                                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| ![medium](@client/help/assets/settings-shell-start-groups-on.png) | ![medium](@client/help/assets/settings-shell-start-groups-off.png) |

<br/>

## Dock the shell

When the shell is docked, the taskbar will no longer have space between it and the screen. This saves space on smaller screen sizes, or you might just prefer this over the "floating" taskbar. To enable docking, turn on **Dock shell** on the Shell page. Here is a preview:

|          |                                                               |
| -------- | ------------------------------------------------------------- |
| Undocked | ![medium](@client/help/assets/settings-shell-docking-off.png) |
| Docked   | ![medium](@client/help/assets/settings-shell-docking-on.png)  |

## Compact Context Menu

The Context Menu is the menu you see when you right click somewhere. This menu always reflects the style of the Shell, which is also why it's on this page. The Context Menu can be made smaller if you're on a smaller screen. To make the Context Menu smaller, enable **Compact context menu** on the Shell page. Here is another preview:

| Uncompacted                                                          | Compact Context Menu                                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| ![large](@client/help/assets/settings-shell-compact-context-off.png) | ![large](@client/help/assets/settings-shell-compact-context-on.png) |

## User Styles

You can customize your ArcOS desktop further by applying custom CSS. Only do this if you know what you're doing. Before you continue, please beware of the following warnings and disclaimers:

1. User styles can make your ArcOS account unusable if you change the wrong thing. If you can't access your account normally, you can change the user styles via Safe Mode.
2. The CSS you write here **will be saved to any themes you make**. This also means that this
   CSS may get discarded if you load a theme that contains user styles.
3. ArcOS and its team members cannot be held accountable for breakages _in-_ or
   _the malfunction of_ your account. We can however provide support if anything goes wrong.

### Examples

- With this code, you can change the font of ArcOS. It uses Google Fonts as the supplier of the font:

  ```
  @import url("https://fonts.googleapis.com/css2?family=Playwrite+NL:wght@100..400&display=swap");

  *:not(.material-icons-round) {
    font-family: "Playwrite NL";
  }
  ```

- This snippet reverts the color scheme of ArcOS back to ArcOS v5:

  ```css
  :root .theme-dark {
    --fg: #ccc;
    --win-bg: #353535;
    --win-border-rad: 7.5px;
    --win-border: rgb(107, 107, 107) 1px solid;
    --win-border-light: #5554 1px solid;
    --glass-bg: #202020a9;
    --glass-alt-bg: #414141a2;
    --glass-ultralight: #0004;
    --glass-ultradark: #0008;
    --darkened-overlay: #0002;
    --darkened-overlay-alt: #0004;
    --startmenu-bg: var(--glass-ultradark);
    --startmenu-applist-item-bg: transparent;
    --startmenu-applist-item-bg-hover: #ffffff05;
    --startmenu-applist-item-bg-active: #0001;
    --button-border-rad: 4px;
    --button-bg: #4a4a4a;
    --button-hover-bg: #555555;
    --button-active-bg: #2a2a2a;
    --button-glass-bg: #fff1;
    --button-glass-hover-bg: #fff3;
    --button-glass-active-bg: #0003;
    --clr-red-bg: #452929;
    --clr-red-fg: #ff7e7e;
    --clr-green-bg: #283e28;
    --clr-green-fg: #a8ffa6;
    --clr-yellow-bg: #49432e;
    --clr-yellow-fg: #ffe073;
    --clr-orange-bg: #543d1b;
    --clr-orange-fg: #ffad32;
    --clr-blue-bg: #273a48;
    --clr-blue-fg: #96d3ff;
    --clr-aqua-fg: #79ffd0;
    --clr-aqua-bg: #214538;
  }
  ```

---

[Back to **Settings**](@client/help/Settings.md)
