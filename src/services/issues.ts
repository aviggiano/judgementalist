import { Watson, getWatsons } from "./watsons";

export type Severity = "high" | "medium" | "false";

export interface Issue {
  file: string;
  watson: Watson;
  severity: Severity;
  title: string;
  markdown: string;

  family?: string;
  judgedSeverity?: Severity;
}

function score(issue: Issue): number {
  const ranking = issue.watson.score ?? 1;
  const senior = issue.watson.senior ? 1000 : 1;
  const severity =
    issue.severity === "high" ? 100 : issue.severity === "medium" ? 10 : 0;
  return senior * ranking * severity;
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
            issue: file,
            watson,
            severity: severity as Severity,
            title,
            markdown,
          };
        })
    )
  );

  const sortedIssues = issues.sort((a, b) => score(b) - score(a));
  return sortedIssues;
}
