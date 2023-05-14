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

export function relevance(issue: Issue, x: boolean): number {
  return 0;
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
      .then((is) => {
        setIssues(is);
        setIssue(is[0]);
      });
  }, []);

  const updateIssue = (issue: Issue) => {
    setIssues(issues.map((i) => (i.file === issue.file ? issue : i)));
    setIssue(issue);
  };

  return (
    <IssuesContext.Provider value={{ issues, updateIssue, issue, setIssue }}>
      {children}
    </IssuesContext.Provider>
  );
}
