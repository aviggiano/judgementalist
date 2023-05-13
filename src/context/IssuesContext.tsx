import { useState, ReactNode, createContext, useEffect } from "react";
import { Issue, getIssues } from "../services/issues";

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
    getIssues().then((is) => {
      setIssues(is);
      setIssue(is[0]);
    });
  }, []);

  const updateIssue = (issue: Issue) => {
    setIssues([...issues].map((i) => (i.file === issue.file ? issue : i)));
    setIssue(issue);
  };

  return (
    <IssuesContext.Provider value={{ issues, updateIssue, issue, setIssue }}>
      {children}
    </IssuesContext.Provider>
  );
}
