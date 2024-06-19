# Virtual Filesystem

If you're reading this, you've found the hidden ArcOS directory on your account. Don't worry! It doesn't take up any space. That's because it's a **virtual folder**. These files don't actually exist on your account, but rather as a part of ArcOS itself.

These files are _actual_ system files that ArcOS uses to operate. Here is a list of the things you can find:

| Item             | Description                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `mode`           | Contains the ArcOS Mode (Release, Development, etc.)                                     |
| `build`          | The Git build of the current version you're running                                      |
| `items.json`     | A JSON file that contains all other system files, generated at build time                |
| `README.md`      | This Readme document                                                                     |
| `Branding/`      | ArcOS logos                                                                              |
| `Cursors/`       | Posy's custom cursors                                                                    |
| `Help/`          | All help articles. These won't display properly unless you view them in the Help Center. |
| `Icons/`         | The icons that ArcOS applications use                                                    |
| `Miscellaneous/` | Files that don't belong in any other folder                                              |
| `Profiles/`      | the ArcOS built-in Profile pictures                                                      |
| `Sounds/`        | Sounds to be used by the ArcOS Soundbus                                                  |
| `System/`        | The core JS and CSS files ArcOS uses to operate.                                         |
| `Thumbnails/`    | Smaller versions of the wallpapers to optimize previews                                  |
| `Wallpapers/`    | ArcOS' built-in wallpapers                                                               |

The files in this directory and its subdirectories can't be edited as they don't exist on your account. To hide the ArcOS folder from the root of your account, turn off **Show hidden files**
