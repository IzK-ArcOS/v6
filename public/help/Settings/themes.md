# Changing the theme

Themes are a bundle of personal settings that you can apply in one go. These are saved on your filesystem or in your user account. There are built-in themes, and themes you created yourself. In this article you'll learn how to:

- Change your accent color and visual style
- Apply a theme
- Save a theme
- Delete a theme

Before you continue, first open the **Settings App**. More information about opening the settings app can be found in the [Settings](@client/help/Settings.md) article under **"Opening the settings app"**. Once opened, make sure you're on the **Themes** page by clicking on **Themes** in the sidebar.

## Changing your accent color or visual style

Your accent color is the color used throughout ArcOS for buttons, links, and window coloring. This color can be anything you like. Keep in mind that a lighter accent color works better on a dark visual style, and vice versa.

To change the accent color, click on the **colored dot** next to the **accent color's Hex Code** on the **Themes** page:
![large](@client/help/assets/settings-themes-accent-color-button.png)

A system dialog will appear, allowing you to change your accent color. This dialog differs between operating system and browser. Changing the color in the dialog might in some cases change it automatically in ArcOS.

> ### ![icon](#WarningIcon) **Keep in mind!**
>
> It might be worth writing this color down somewhere or saving it in a theme if you want to use it in the future. ArcOS does not remember previous accent colors.

### The Visual Style

The **Visual Style** is the main way ArcOS looks. By default, ArcOS is set to the **Dark** visual style, but there are a couple options you can choose from.

To change the visual style, click on the **dropdown** right below **"Visual Style"** on the **Themes** page:
![large](@client/help/assets/settings-themes-visual-dropdown.png)

Here is a table of the visual styles you can apply, along with their IDs:

| Name             | ID       | Description                                   |
| ---------------- | -------- | --------------------------------------------- |
| Darkmode         | `dark`   | The default dark style                        |
| Lightmode        | `light`  | The default light style                       |
| Amoled           | `amoled` | A Dark style designed for OLED screens        |
| Amber Monochrome | `amber`  | A style to match the appearance of Amber CRTs |
| Science Fiction  | `scifi`  | A style made with science-fiction colors      |
| High Contrast    | `hc`     | High contrast style for accessibility         |

<br/>

## Apply a theme

When you want to change the appearance of ArcOS according to a theme, you have to _apply_ it. This can be done in two ways. One is through the [Settings](@client/help/Settings.md) app, the other is using the [File Manager](@client/help/FileManager.md). Here they are:

1. **Clicking on the theme in the Settings App** <br/>
   If the theme is on the Themes page, simply click it to apply. This will immediately apply the settings from the theme:
   ![large](@client/help/assets/settings-themes-apply.png)

2. **Opening the file through the File Manager** <br/>
   If you have a Theme File on your filesystem (a file ending in `.arctheme`), you can apply it by double-clicking it in the File Manager as so:
   ![large](@client/help/assets/settings-themes-fstheme-apply.png)

## Save a theme

Saving a theme can be read in two ways. One is to save it on the Themes page by clicking **Save Theme**, the other is to save it to your filesystem. Here are these two explained:

1. **Saving the theme on the Themes Page** <br/>
   On the Themes page, click on the **Save Theme** button:
   ![large](@client/help/assets/settings-themes-save-button.png)

   <br/>

   In the dialog that appears, enter a name for the theme, and click on Save to confirm:
   ![large](@client/help/assets/settings-themes-save-confirm.png)

   <br/>

   The theme will then be saved to your user account.

2. **Saving an existing theme to your filesystem** <br/>
   Saving a theme to your filesystem is quite easy. Right-click any theme, and select the **Save to ArcFS** option:
   ![large](@client/help/assets/settings-themes-save-to-arcfs.png)

   <br/>

   In the dialog that appears, enter a file name for your theme, and click on Save to confirm:
   ![large](@client/help/assets/settings-themes-save-theme-file-to.png)

   <br/>

   The theme will then be saved to your ArcOS filesystem.

## Delete a theme

Deleting a theme can only be done with themes you created. The built-in themes cannot be deleted. You can consider those themes to be "read-only".

To delete a user theme, simply right click it in the Settings app and select the **Delete theme** option:
![large](@client/help/assets/settings-themes-delete-theme.png)

A confirmation will appear, asking you if you really want to delete this theme. Keep in mind that deleting a theme cannot be reverted. Deleted themes are lost forever. To delete the theme, click on **Delete Theme**:

![large](@client/help/assets/settings-themes-delete-theme-confirm.png)

The theme will then be removed from your account.

---

[Back to **Settings**](@client/help/Settings.md)
