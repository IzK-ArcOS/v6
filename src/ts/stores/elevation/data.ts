import { AccountIcon, ModeIcon, PasswordIcon, WindowSettingsIcon } from "$ts/images/general";
import { ShutdownIcon } from "$ts/images/power";
import { Process } from "$ts/process";
import { App } from "$types/app";
import { ElevationData, ElevationLevel } from "$types/elevation";
import { Service } from "$types/service";
import { UserName } from "../user";

export function ElevatedAppLaunchData(app: App): ElevationData {
  return {
    what: "ArcOS needs your permission to open the following application:",
    image: app.metadata.icon,
    title: app.metadata.name,
    description: app.metadata.author,
    level: ElevationLevel.low,
  };
}

export function ChangeDisabledStateData(id: string): ElevationData {
  return {
    what: "ArcOS needs your permission to perform the following action:",
    image: ModeIcon,
    title: "Change Disabled State",
    description: `Of ${id}`,
    level: ElevationLevel.high,
  };
}

export function ElevationKillProcess(proc: Process): ElevationData {
  return {
    what: "ArcOS needs your permission to kill the following process:",
    image: ShutdownIcon,
    title: proc.name,
    description: `PID ${proc.pid}`,
    level: ElevationLevel.medium,
  };
}

export function ElevationKillAppProcesses(id: string): ElevationData {
  return {
    what: "ArcOS needs your permission to kill processes of the following app:",
    image: ShutdownIcon,
    title: id,
    description: `From the Library`,
    level: ElevationLevel.medium,
  };
}

export function ElevationChangeServiceState(service: Service): ElevationData {
  return {
    what: "ArcOS needs your permission to change the state of the following service:",
    image: WindowSettingsIcon,
    title: service.name,
    description: service.description,
    level: ElevationLevel.high,
  };
}

export function ElevationChangePassword(): ElevationData {
  return {
    what: "You need permission from yourself to change your password:",
    image: PasswordIcon,
    title: `Change Password`,
    description: `Of ${UserName.get()}`,
    level: ElevationLevel.high,
  };
}

export function ElevationChangeUsername(): ElevationData {
  return {
    what: "You need permission from yourself to change your username:",
    image: AccountIcon,
    title: `Change Username`,
    description: `Of ${UserName.get()}`,
    level: ElevationLevel.high,
  };
}

export function ElevationChangeUserData(): ElevationData {
  return {
    what: "ArcOS needs your permission to make changes to your user data:",
    image: AccountIcon,
    title: `Change User Data`,
    description: `Of ${UserName.get()}`,
    level: ElevationLevel.high,
  };
}
