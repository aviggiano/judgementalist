import { useContext, useState } from "react";
import { IssuesContext } from "../context/IssuesContext";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Issue } from "../services/issues";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const { issues } = useContext(IssuesContext);
  const [issue, setIssue] = useState<Issue | undefined>();

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">Submissions</Typography>
        {issues.map((issue) => (
          <Button onClick={() => setIssue(issue)}>{issue.file}</Button>
        ))}
      </Box>
      <Box>
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
  );
}

export default App;
