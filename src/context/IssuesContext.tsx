import { useState, ReactNode, createContext, useEffect } from "react";
import { Issue, getIssues } from "../services/issues";

interface IIssuesContext {
  issues: Issue[];
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

  return (
    <IssuesContext.Provider value={{ issues }}>
      {children}
    </IssuesContext.Provider>
  );
}
