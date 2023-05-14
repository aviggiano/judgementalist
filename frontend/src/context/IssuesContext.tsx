import { useState, ReactNode, createContext, useEffect } from "react";

export type Severity = "high" | "medium" | "false";

export interface Watson {
  name: string;
  days?: number;
  is_team?: boolean;
  payout?: number;
  score?: number;
  senior?: boolean;
}

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
 * @param sortByDecidedSeverity sort by decidedSeverity instead of severity
 * @returns the issue relevance
 */
export function relevance(
  issue: Issue,
  sortByDecidedSeverity?: boolean
): number {
  const score = issue.watson.score ?? 1;
  const senior = issue.watson.senior ? 1000 : 1;
  const severity =
    issue.severity === "high" ? 100 : issue.severity === "medium" ? 10 : 0;
  const decidedSeverity =
    issue.decidedSeverity === "high"
      ? 100
      : issue.decidedSeverity === "medium"
      ? 10
      : 0;
  return senior * score * (sortByDecidedSeverity ? decidedSeverity : severity);
}

interface IIssuesContext {
  issues: Issue[];
  issue?: Issue;
  setIssue: (issue: Issue) => void;
  updateIssue: (issue: Issue) => void;
}

export const IssuesContext = createContext<IIssuesContext>(
  {} as IIssuesContext
);

type Props = {
  children: ReactNode;
};

export function IssuesProvider({ children }: Props) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issue, setIssue] = useState<Issue | undefined>();

  useEffect(() => {
    fetch("/issues")
      .then((res) => res.json())
      .then((is: Issue[]) => is.sort((a, b) => relevance(b) - relevance(a)))
      .then((is) => {
        setIssues(is);
        setIssue(is[0]);
      });
  }, []);

  const updateIssue = (issue: Issue) => {
    fetch(`/issues/${issue.file}`, {
      method: "PATCH",
      body: JSON.stringify(issue),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      setIssues(issues.map((i) => (i.file === issue.file ? issue : i)));
      setIssue(issue);
    });
  };

  return (
    <IssuesContext.Provider value={{ issues, updateIssue, issue, setIssue }}>
      {children}
    </IssuesContext.Provider>
  );
}
