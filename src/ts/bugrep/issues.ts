import { GitHubIssue } from "$types/github";
import { getReport } from ".";

let ISSUE_CACHE: GitHubIssue[] = [];

export async function getReportIssue(id: string): Promise<GitHubIssue> {
  const report = await getReport(id);

  if (!report) return null;

  let issues: GitHubIssue[] = [];

  if (ISSUE_CACHE.length) issues = [...ISSUE_CACHE];
  else {
    issues = (await (
      await fetch(
        "https://api.github.com/repos/IzK-ArcOS/ArcOS-Reports/issues?per_page=100"
      )
    ).json()) as GitHubIssue[];

    if (!issues.length) return null;

    ISSUE_CACHE = [...issues];
  }

  if (!issues.length) return null;

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].body.includes(`br$${report.issueid}`)) return issues[i];
  }

  return null;
}
