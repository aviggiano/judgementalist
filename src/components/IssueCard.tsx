import { Issue } from "../services/issues";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Severity from "./Severity";

function IssueCard({
  issue,
  onClick,
  decidedCard,
}: {
  issue: Issue;
  onClick?: () => void;
  decidedCard?: boolean;
}) {
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
            backgroundColor:
              decidedCard || !issue.decidedSeverity ? "inherit" : "lightgray",
          }}
        >
          <Typography variant="body1" color="text.bold">
            {issue.title}
          </Typography>
          <Box>
            {decidedCard ? (
              <>
                {issue.decidedSeverity && (
                  <Severity
                    issue={{ ...issue, severity: issue.decidedSeverity }}
                  />
                )}
                <Severity
                  issue={issue}
                  variant={issue.decidedSeverity ? "outlined" : "filled"}
                />
              </>
            ) : (
              <Severity issue={issue} />
            )}
          </Box>
          <Typography variant="subtitle1">{issue.watson.name}</Typography>
          <Typography variant="subtitle2">{issue.file}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default IssueCard;
