import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useContext } from "react";
import { IssuesContext } from "../context/IssuesContext";
import Severity from "./Severity";

function DecidedIssueCard({
  decidedDuplication,
}: {
  decidedDuplication: string;
}) {
  const { issues, setIssue } = useContext(IssuesContext);
  const decidedIssues = issues
    .filter((issue) => issue.decidedSeverity)
    .filter((issue) => issue.decidedDuplication === decidedDuplication);

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box>
            <Typography variant="subtitle2">{decidedDuplication}</Typography>
          </Box>
          <Box>
            <Severity issue={decidedIssues[0]} useDecidedSeverity />
            {decidedIssues.map((issue) => (
              <Chip
                size="small"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => setIssue(issue)}
                label={`${issue.decidedDoublecheck ? "? " : ""}${issue.file}`}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DecidedIssueCard;
