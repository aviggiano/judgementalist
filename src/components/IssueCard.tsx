import { Issue } from "../services/issues";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Severity from "./Severity";

function IssueCard({ issue, onClick }: { issue: Issue; onClick?: () => void }) {
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Typography variant="body1" color="text.bold">
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
            <Typography variant="subtitle1">{issue.watson.name}</Typography>
            <Typography variant="subtitle2">{issue.file}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default IssueCard;
