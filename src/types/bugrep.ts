import { Record } from "pocketbase";
import { UserData } from "./user";

export interface Report {
  author?: string;
  title: string;
  body: string;
  version: string;
  log: string;
  userdata?: UserData;
  api?: string;
  issueid: string;
  resolved: boolean;
  closed: boolean;
  mode_file?: string;
  desktop: boolean;
  useragent?: string;
  location: object;
  metaenv: object;
  frontend: string;
  id?: string;
}

export type ReportRecord = Report & Record;

export interface ReportOptions {
  includeUserData: boolean;
  includeApi: boolean;
  title: string;
  body?: string;
}

export interface LocalReportData {
  id: string;
  timestamp: number;
}

export const defaultReportOptions: ReportOptions = {
  includeApi: true,
  includeUserData: false,
  title: "Auto-generated report",
  body: "No user-input was provided when generating this report.",
};
