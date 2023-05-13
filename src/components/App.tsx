import { useContext, useState } from "react";
import { IssuesContext } from "../context/IssuesContext";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Issue } from "../services/issues";
import { Box, Button, Container, Typography } from "@mui/material";

function App() {
  const { issues } = useContext(IssuesContext);
  const [issue, setIssue] = useState<Issue | undefined>(issues[0]);

  const judged = issues.filter((issue) => issue.judgedSeverity);

  return (
    <Box sx={{ height: "calc(100vh)", display: "flex" }}>
      <Container sx={{ width: "25%" }}>
        <Typography variant="h4">Judged</Typography>
        {judged.map((issue) => (
          <Button onClick={() => setIssue(issue)}>{issue.file}</Button>
        ))}
      </Container>
      <Container
        sx={{ display: "flex", flexDirection: "column", width: "25%" }}
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
            <Button onClick={() => setIssue(issue)}>{issue.file}</Button>
          ))}
        </Box>
      </Container>
      <Container sx={{ width: "50%" }}>
        <Typography variant="h4">Issue</Typography>
        <Box
          sx={{
            height: "calc(100vh - 50px)",
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
      </Container>
    </Box>
  );
}

export default App;
