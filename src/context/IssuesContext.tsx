import { useState, ReactNode, createContext, useEffect } from "react";
import { Issue, getIssues } from "../services/issues";

interface IIssuesContext {
  issues: Issue[];
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

  useEffect(() => {
    getIssues().then(setIssues);
  }, []);

  const updateIssue = (issue: Issue) => {
    setIssues(issues.map((i) => (i.file === issue.file ? issue : i)));
  };

  return (
    <IssuesContext.Provider value={{ issues, updateIssue }}>
      {children}
    </IssuesContext.Provider>
  );
}
