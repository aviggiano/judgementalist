import { useContext } from "react";
import { IssuesContext, relevance } from "./context/IssuesContext";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import IssueCard from "./components/IssueCard";
import Decision from "./components/Decision";
import DecidedIssueCard from "./components/DecidedIssueCard";

function App() {
  const { issues, issue, setIssue } = useContext(IssuesContext);

  const judged = issues
    .filter((issue) => issue.decidedSeverity)
    .sort((a, b) => relevance(b, true) - relevance(a, true));
  const decidedDuplicationsList = judged.map(
    (issue) => issue.decidedDuplication
  );

  const decidedDuplications = decidedDuplicationsList.filter(
    (value, index) => decidedDuplicationsList.indexOf(value) === index
  ) as string[];

  const sortedIssues = issues.sort(
    (a, b) => relevance(b) - relevance(a) + b.file.localeCompare(a.file)
  );

  return (
    <Box
      sx={{
        height: "calc(100vh)",
        display: "flex",
      }}
    >
      <Box sx={{ width: "25%" }}>
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h4">Judged</Typography>
          <Box
            sx={{
              height: "calc(100vh - 80px)",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
            }}
          >
            {decidedDuplications.map((decidedDuplication) => (
              <DecidedIssueCard
                key={decidedDuplication}
                decidedDuplication={decidedDuplication}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "25%",
        }}
      >
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h4">Submissions</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 60px)",
              overflowY: "scroll",
            }}
          >
            <Paper elevation={2}>
              {sortedIssues.map((issue) => (
                <IssueCard
                  key={issue.file}
                  issue={issue}
                  onClick={() => setIssue(issue)}
                />
              ))}
            </Paper>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Box
          sx={{
            padding: "10px",
          }}
        >
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
                  height: "calc(100vh - 60px - 180px)",
                  overflowY: "scroll",
                }}
              >
                <Card variant="outlined">
                  <CardContent>
                    <MarkdownPreview
                      source={issue.markdown}
                      wrapperElement={{
                        "data-color-mode": "light",
                      }}
                    />
                  </CardContent>
                </Card>
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
    </Box>
  );
}

export default App;
