import { compileStringLog } from "$ts/console/collector";
import { ArcOSVersion } from "$ts/env";
import { ARCOS_MODE } from "$ts/metadata";
import { isDesktop } from "$ts/metadata/desktop";
import { getServer } from "$ts/server/multi";
import { getAppPreference, setAppPreference } from "$ts/server/user/pref";
import { UserDataStore, UserName } from "$ts/stores/user";
import {
  LocalReportData,
  Report,
  ReportOptions,
  ReportRecord,
  defaultReportOptions,
} from "$types/bugrep";
import PocketBase from "pocketbase";
import { removeApiSensitive } from "./obfuscate";

const pb = new PocketBase("https://pb.arcapi.nl/");

export async function sendReport(options: ReportOptions = defaultReportOptions) {
  const report = createReport(options);
  const id = (await pb.collection("bugrep").create<ReportRecord>(report, { br: "true" })).id;

  if (report.author) saveReportToUser(id);

  return id;
}

export function createReport(options: ReportOptions = defaultReportOptions): Report {
  const rnd = () => Math.floor(Math.random() * 1e6);

  const x = {
    author: UserName.get(),
    title: options.title,
    body: options.body || "No body",
    version: ArcOSVersion,
    log: removeApiSensitive(compileStringLog().join("\n")),
    userdata: options.includeUserData ? UserDataStore.get() : null,
    api: options.includeApi ? getServer() : null,
    issueid: `${rnd()}-${rnd()}-${rnd()}-${rnd()}`,
    resolved: false,
    closed: false,
    desktop: isDesktop(),
    mode_file: ARCOS_MODE,
    useragent: navigator.userAgent,
    frontend: isDesktop() ? "<desktop>" : location.host,
    location: location,
    metaenv: import.meta.env,
    created_at: "",
    modified_at: "",
  };

  return x;
}

export async function getReport(id: string) {
  if (!id) return null;
  try {
    return await pb
      .collection("bugrep")
      .getOne<ReportRecord>(id, { $autoCancel: false, br: "true" });
  } catch {
    return null;
  }
}

export async function reportExists(id: string) {
  return !!(await getReport(id));
}

export function saveReportToUser(id: string) {
  const reports = (getAppPreference("Reporting", "reports") as LocalReportData[]) || [];

  reports.push({ id, timestamp: new Date().getTime() });

  setAppPreference("Reporting", "reports", reports);
}
