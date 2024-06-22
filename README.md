<div align="center">
  
<p align="center">
    <a href="https://izk-arcos.nl/" target="_blank" rel="noopener">
        <img src="https://github.com/IzK-ArcOS/v6/assets/76709090/0121ffdb-bd9d-430d-b5d3-440fb569e297" width="768px"/>
    </a>
</p>
  
# 👋 Welcome to ArcOS!

[![MadeWithSvelte.com](https://madewithsvelte.com/storage/repo-shields/4407-shield.svg)](https://madewithsvelte.com/p/arcos/shield-link)
[![Chat with us!](https://img.shields.io/discord/1082383732637450320?label=Community&logo=discord)](https://discord.gg/S3fTadu88C)
[![Contributors](https://img.shields.io/github/contributors/IzK-ArcOS/ArcOS-Frontend)](https://github.com/IzK-ArcOS/ArcOS-Frontend/graphs/contributors)
[![Releases](https://raster.shields.io/github/v/release/IzK-ArcOS/ArcOS-Frontend.svg)](https://github.com/IzK-ArcOS/ArcOS-Frontend/releases)
[![Pulse](https://img.shields.io/github/commit-activity/m/IzK-ArcOS/ArcOS-Frontend)](https://github.com/badges/IzK-ArcOS/ArcOS-Frontend)
![Uptime](https://kuma.arcapi.nl/api/badge/7/status?label=Community+API)

</div>

ArcOS is the advanced Svelte-based Operating System Environment in your browser. With ArcOS we aim to create the best possible experience we can within the confines of your browser. ArcOS consists of:

- 📊 Advanced process and service management,
- ☁ Readymade cloud storage to access your account from anywhere using ArcOS' [ArcAPI](https://github.com/IzK-ArcOS/ArcOS-API-Rewritten) (WIP),
- 🔐 A secure user system consisting of hashed and salted passwords,
- 🗄 Filesystem integration to store, create and upload files,
- 📧 A built-in messaging system to talk to other ArcOS users on the same server,
- ✨ Endless customization options to really adjust ArcOS to your personal taste,
- 🐣 Beginner-friendly User Interface without the need of manuals,
- 🧾 Inclusive Help & Support center to read up on things you don't immediately understand,
- ⚠ Powerful error reporting and crash logs so that we can fix anything that's wrong as fast as possible

## 🛠 Getting started

The easiest way to use ArcOS is to open it on [the web frontend](https://web.izk-arcos.nl/), which is always updated to match the current version of ArcOS. If you prefer a download instead, you can find the latest updates on [the releases page](https://github.com/IzK-ArcOS/ArcOS-Frontend/releases). This Desktop App is powered by Electron, and it might perform better than the browser version, depending on the browser and device.

### The other option: cloning ArcOS yourself.

Cloning ArcOS v6 is now possible! As of June 25th 2024, ArcOS v6 is made public. Though, because of the scale of this project, it isn't as straight-forward to clone as its predecessor.

#### Prerequisites

You'll need these dependencies installed on your system to be able to clone and run ArcOS v6:

- Git ([download](https://git-scm.com/download))
- NodeJS 20+ ([download](https://nodejs.org/))
- Yarn: `npm i -g yarn`
- Serve: `npm i -g serve`

#### To clone ArcOS v6:

- Use git with `--recurse-submodules` to clone ArcOS with all submodules included:
  ```bash
  $ git clone --recurse-submodules https://github.com/IzK-ArcOS/v6
  ```
- Go into the v6 directory and install the dependencies:
  ```bash
  $ cd v6
  $ yarn
  ```
- To run ArcOS v6, you can run `yarn serve` to start a built version of ArcOS. You can access it on https://localhost:3000/.
- To work on ArcOS, you can run `yarn dev` to start the development environment. The development environment will start on https://localhost:5173/.

> Note: because of the way `yarn build` is set up, you can't use the `--outDir` flag. Sorry about that.

#### To update your local copy of v6:

Because of the way ArcOS is configured, please **do not** use `git pull` on its own. Instead, use the `yarn update` command we provide to automatically pull all upstream changes as well as update all submodules ArcOS has.

## Links

These links bring you to the common places in and around ArcOS.

- The ArcOS Website lives [here](https://izk-arcos.nl).
- ArcOS can be used on [this site](https://web.izk-arcos.nl) ([beta](https://beta.izk-arcos.nl))
- Our GitHub is [here](https://github.com/IzK-ArcOS) (and amazing).
- ArcOS runs on our own ArcAPI, which is on [this page](https://github.com/IzK-ArcOS/ArcOS-API-Rewritten).

## 💪 Contributing

Found something you miss or is there a bug that we need to resolve? The best place for bugs is **Bug Reports** inside ArcOS, and [the issues page](https://github.com/IzK-ArcOS/ArcOS-Frontend/issues) for feature requests and stuff that needs further discussion.

You can also contribute code! If you're working in a submodule, please make sure the branch is set to the submodule's `main` branch to avoid unknown refs. The team does this using the branch button next to the submodule in Visual Studio Code's source control tab.

> [!WARNING]
> The code you see in [IzK-ArcOS/ArcOS-Frontend](https://github.com/IzK-ArcOS/ArcOS-Frontend) belongs to the now discontinued ArcOS v5. This code is not current anymore, pull requests regarding it will be ignored.

## Disclaimersz`

- ArcOS cannot be used as a primary operating system. An attempt to do so is discouraged.
- This is not an actual operating system. It is an environment that runs on top of your already existing OS, built using web technologies. It isn't possible to install already existing applications from third parties. This functionality may be implemented in the distant future.
- All assets in ArcOS, including those created by the team, belong to their respective owners. Reuse without credit is not permitted.
- The ArcOS team is not responsible for loss of data when using ArcAPI. Do not store sensitive info on the File System. ArcAPI passwords are hashed and salted.
