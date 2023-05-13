import { useContext } from "react";
import { IssuesContext } from "../context/IssuesContext";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Box, Paper, Typography } from "@mui/material";
import IssueCard from "./IssueCard";
import Decision from "./Decision";

function App() {
  const { issues, issue, setIssue } = useContext(IssuesContext);

  const judged = issues.filter((issue) => issue.decidedSeverity);

  return (
    <Box sx={{ height: "calc(100vh)", display: "flex" }}>
      <Box sx={{ width: "25%", padding: "20px" }}>
        <Typography variant="h4">Judged</Typography>
        {judged.map((issue) => (
          <IssueCard key={issue.file} issue={issue} />
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
          <Paper elevation={2}>
            {issues.map((issue) => (
              <IssueCard
                key={issue.file}
                issue={issue}
                onClick={() => setIssue(issue)}
              />
            ))}
          </Paper>
        </Box>
      </Box>
      <Box sx={{ width: "50%", padding: "20px" }}>
        <Typography variant="h4">Issue</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {issue && (
            <Box
              sx={{
                height: "calc(100vh - 80px - 180px)",
                overflowY: "scroll",
              }}
            >
              <MarkdownPreview
                source={issue.markdown}
                wrapperElement={{
                  "data-color-mode": "light",
                }}
              />
            </Box>
          )}
          {issue && (
            <Box>
              <Decision issue={issue} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
