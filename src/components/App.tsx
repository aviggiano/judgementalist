import { useContext, useState } from "react";
import { IssuesContext } from "../context/IssuesContext";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Issue } from "../services/issues";
import { Box, Divider, Paper, Typography } from "@mui/material";
import IssueCard from "./IssueCard";

function App() {
  const { issues } = useContext(IssuesContext);
  const [issue, setIssue] = useState<Issue | undefined>(issues[0]);

  const judged = issues.filter((issue) => issue.judgedSeverity);

  return (
    <Box sx={{ height: "calc(100vh)", display: "flex", gap: "20px" }}>
      <Box sx={{ width: "25%", padding: "20px" }}>
        <Typography variant="h4">Judged</Typography>
        {judged.map((issue) => (
          <IssueCard issue={issue} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          width: "25%",
        }}
      >
        <Typography variant="h4">Submissions</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          {issues.map((issue) => (
            <IssueCard issue={issue} onClick={() => setIssue(issue)} />
          ))}
        </Box>
      </Box>
      <Box sx={{ width: "50%", padding: "20px" }}>
        <Typography variant="h4">Issue</Typography>
        <Box
          sx={{
            height: "calc(100vh - 80px)",
            overflowY: "scroll",
          }}
        >
          {issue && (
            <MarkdownPreview
              source={issue.markdown}
              wrapperElement={{
                "data-color-mode": "light",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
