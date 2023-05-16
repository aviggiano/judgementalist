import fs from "fs/promises";
import * as database from ".";

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
  decidedDoublecheck?: boolean;
}

export async function getIssues(): Promise<Issue[]> {
  await database.connect();
  const is = await database.get("issues");
  if (is) return is;

  const issuesList = await fs.readdir("../issues");
  const watsons = await getWatsons();
  const issues: Issue[] = await Promise.all(
    (issuesList as string[]).map((file) =>
      fs
        .readFile(`../issues/${file}`)
        .then((res) => res.toString())
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
  await database.set("issues", issues);

  return issues;
}

export async function getIssue(file: string): Promise<Issue | undefined> {
  const issues = await getIssues();
  return issues.find((issue) => issue.file === file);
}

export async function updateIssue(file: string, issue: Issue): Promise<Issue> {
  const issues = (await getIssues()).map((i) => (i.file === file ? issue : i));
  await database.set("issues", issues);
  return issue;
}

export async function done(): Promise<void> {
  const issues = await getIssues();

  let cmd = "";

  const severities = ["high", "medium"];
  for (const severity of severities) {
    const is = [
      ...new Set(
        issues
          .filter((issue) => issue.decidedSeverity === severity)
          .filter((issue) => issue.decidedDuplication)
          .map((issue) => issue.decidedDuplication)
      ),
    ];
    for (let i = 0; i < is.length; i++) {
      const dir = `${(i + 1).toString().padStart(3, "0")}-${severity
        .charAt(0)
        .toUpperCase()}`;
      cmd += `mkdir -p ${dir}\n`;

      const duplicatedIssues = issues.filter(
        (issue) => issue.decidedDuplication === is[i]
      );
      for (const issue of duplicatedIssues) {
        cmd += `git mv ${issue.file} ${dir}/${
          issue.decidedBest ? issue.file.replace(".md", "-best.md") : issue.file
        }\n`;
      }
    }
  }
  console.log(cmd);
}
