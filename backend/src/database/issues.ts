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
}

export async function getIssues(): Promise<Issue[]> {
  await database.connect();
  const data = await database.get();
  if (data.issues) return data.issues;

  if (!data.issuesList) {
    const issuesList = await fs.readdir("../issues");
    await database.set("issuesList", issuesList);
  }
  const watsons = await getWatsons();
  const issues: Issue[] = await Promise.all(
    (data.issuesList as string[]).map((file) =>
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
  const issues = (await getIssues()).map((i) =>
    i.file === issue.file ? issue : i
  );
  await database.set("issues", issues);
  return issue;
}
