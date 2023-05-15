import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useContext } from "react";
import { IssuesContext } from "../context/IssuesContext";
import DecidedSeverity from "./DecidedSeverity";

function DecidedIssueCard({
  decidedDuplication,
  index,
}: {
  decidedDuplication: string;
  index: number;
}) {
  const { issues, setIssue } = useContext(IssuesContext);
  const decidedIssues = issues
    .filter((issue) => issue.decidedSeverity)
    .filter((issue) => issue.decidedDuplication === decidedDuplication);
  const decidedIssue = decidedIssues[0];

  const decidedSeverityHigh = new Set(
    issues
      .filter((issue) => issue.decidedSeverity === "high")
      .map((issue) => issue.decidedDuplication)
  ).size;

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box>
            <Typography variant="subtitle2">{decidedDuplication}</Typography>
          </Box>
          <Box>
            <DecidedSeverity
              issue={decidedIssue}
              index={
                decidedIssue.decidedSeverity === "high"
                  ? index + 1
                  : index + 1 - decidedSeverityHigh
              }
            />
            {decidedIssues.map((issue) => (
              <Chip
                size="small"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => setIssue(issue)}
                label={`${issue.decidedDoublecheck ? "❓ " : ""}${
                  issue.decidedBest ? "⭐ " : ""
                }${issue.file}`}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DecidedIssueCard;
