import { ArcOSVersion } from "$ts/env";
import { UpdateIcon } from "$ts/images/general";
import { DESKTOP_MODE } from "$ts/metadata/desktop";
import { sendNotification } from "$ts/notif";
import { Process, ProcessHandler } from "$ts/process";
import { stopService } from "$ts/service/interact";
import { App } from "$types/app";
import { GitHubRelease, Version } from "$types/github";
import { Service } from "$types/service";

let GITHUB_CACHE: GitHubRelease = null;

export class AUS extends Process {
  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: string[]) {
    super(handler, pid, name, app, args);
  }

  public async start() {
    await this.checkForUpdates();

    stopService("ArcUpdateService", true);
  }

  async getLatestRelease(): Promise<GitHubRelease> {
    if (GITHUB_CACHE) return GITHUB_CACHE;

    try {
      const req = (await (
        await fetch("https://api.github.com/repos/IzK-ArcOS/ArcOS-Frontend/releases/latest", {
          cache: "no-store",
        })
      ).json()) as GitHubRelease;

      GITHUB_CACHE = req;

      return req;
    } catch {
      return null;
    }
  }

  async getLatestVersion(): Promise<Version> {
    const current = this.parseVersion(ArcOSVersion);

    try {
      const req = await this.getLatestRelease();

      if (!req) return current;

      const version = this.parseVersion(this.filterTagName(req.tag_name));

      if (this.versionBigger(version, current)) return version;

      return current;
    } catch {
      return current;
    }
  }

  parseVersion(verStr: string): Version {
    const split = verStr.replaceAll("v", "").split(".");

    return [split[0], split[1], split[2]].map((a) => {
      try {
        return parseInt(a);
      } catch {
        return 0;
      }
    }) as Version;
  }

  filterTagName(tn: string) {
    if (!tn) return ArcOSVersion;
    return tn.split("-")[0];
  }

  versionBigger(a: Version, b: Version) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] > b[i]) return true;
    }

    return false;
  }

  async checkForUpdates() {
    if (DESKTOP_MODE !== "desktop" && !import.meta.env.DEV) return;

    const release = await this.getLatestRelease();
    const latestVersion = this.parseVersion(this.filterTagName(release.tag_name));

    if (this.versionBigger(latestVersion, this.parseVersion(ArcOSVersion))) {
      this.Notify(latestVersion, release.html_url);
    }
  }

  async Notify(version: Version, url: string) {
    sendNotification({
      image: UpdateIcon,
      title: "Update available!",
      message: `ArcOS v${version.join(
        "."
      )} has been released! Update now to get the latest features and stability improvements.`,
      buttons: [
        {
          caption: "Download Update",
          action() {
            window.open(url, "_blank");
          },
        },
      ],
    });
  }
}

export const ArcUpdateService: Service = {
  name: "ArcOS Update Service",
  description: "Checks for ArcOS updates",
  process: AUS,
  initialState: "started",
};
