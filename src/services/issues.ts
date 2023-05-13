import { Watson, getWatsons } from "./watsons";

export type Severity = "high" | "medium" | "false";

export interface Issue {
  file: string;
  watson: Watson;
  severity: Severity;
  title: string;
  markdown: string;

  decidedBest?: boolean;
  decidedDuplication?: string;
  decidedSeverity?: Severity;
}

/**
 * Returns the relevance of an issue according to some heuristics:
 * - senior watsons are probably right most of the time, judge them first
 * - a watson's score on the leaderboard probably means they are better at audits, judge them first
 * - high severity issues are more important than medium severity issues, judge them first
 * - issues that are already classified as 'false' by the system will be discarded anyways, don't judge them
 * @param issue a finding from a Sherlock contest
 * @returns the issue relevance
 */
function relevance(issue: Issue): number {
  const score = issue.watson.score ?? 1;
  const senior = issue.watson.senior ? 1000 : 1;
  const severity =
    issue.severity === "high" ? 100 : issue.severity === "medium" ? 10 : 0;
  return senior * score * severity;
}

export async function getIssues(): Promise<Issue[]> {
  const watsons = await getWatsons();
  const issuesList: string[] = await fetch("/issues.json").then((res) =>
    res.json()
  );
  const issues: Issue[] = await Promise.all(
    issuesList.map((file) =>
      fetch(`/issues/${file}`)
        .then((res) => res.text())
        .then((markdown) => {
          const lines = markdown.split("\n");
          const [author, , severity, , h_title] = lines;
          const title = h_title.replace(/# /, "");
          const watson =
            watsons.find((w) => w.name === author) ||
            ({ name: author } as Watson);
          return {
            file,
            watson,
            severity: severity as Severity,
            title,
            markdown,
          };
        })
    )
  );

  const sortedIssues = issues.sort((a, b) => relevance(b) - relevance(a));
  return sortedIssues;
}
