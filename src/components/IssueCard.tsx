import { Issue } from "../services/issues";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

function IssueCard({ issue, onClick }: { issue: Issue; onClick?: () => void }) {
  const color =
    issue.severity === "high"
      ? "error"
      : issue.severity === "medium"
      ? "warning"
      : "default";
  return (
    <Box onClick={onClick}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1" color="text.bold">
            {issue.title}
          </Typography>
          <Chip label={issue.severity} color={color} />
          <Typography variant="subtitle1">{issue.watson.name}</Typography>
          <Typography variant="subtitle2">{issue.file}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default IssueCard;
