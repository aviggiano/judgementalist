import { Box, Card, CardContent, Typography } from "@mui/material";
import Severity from "./Severity";
import { Issue, IssuesContext } from "../context/IssuesContext";
import { useContext } from "react";

function IssueCard({
  issue,
  at,
  onClick,
}: {
  issue: Issue;
  at: string;
  onClick?: () => void;
}) {
  const { issue: i } = useContext(IssuesContext);

  return (
    <Box
      sx={{
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Card variant="outlined">
        <CardContent
          sx={{
            backgroundColor: !issue.decidedSeverity ? "inherit" : "lightgray",
            border: "4px solid transparent",
            borderColor: issue.file === i?.file ? "teal" : "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Typography variant="subtitle2" color="text.bold">
            {issue.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Severity issue={issue} />
            <Typography variant="subtitle2">{issue.watson.name}</Typography>
            <Typography variant="subtitle2">{issue.file}</Typography>
            <Typography variant="subtitle2">{at}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default IssueCard;
