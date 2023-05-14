import { useContext, useState } from "react";
import { Issue, Severity } from "../services/issues";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { IssuesContext } from "../context/IssuesContext";
import Autocomplete from "./Autocomplete";

function Decision({ issue }: { issue: Issue }) {
  const [value, setValue] = useState(issue.decidedDuplication);
  const { issues, updateIssue } = useContext(IssuesContext);

  const decideSeverity = (decidedSeverity: Severity) => {
    updateIssue({ ...issue, decidedSeverity });
  };

  const decideDuplication = (decidedDuplication: string) => {
    updateIssue({ ...issue, decidedDuplication });
  };

  function DecidedSeverity({ severity }: { severity: Severity }) {
    const color =
      severity === "high"
        ? "error"
        : severity === "medium"
        ? "warning"
        : "default";

    return (
      <Chip
        size="small"
        sx={{ cursor: "pointer", width: "100%" }}
        onClick={() => decideSeverity(severity)}
        label={severity}
        color={color}
        variant={issue.decidedSeverity === severity ? "filled" : "outlined"}
      />
    );
  }

  return (
    <Box>
      <Card sx={{ height: "180px" }} variant="outlined">
        <CardContent>
          <Typography variant="h5" color="text.bold">
            Decision
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <Typography variant="h6" color="text.bold">
                Severity
              </Typography>
              <Box sx={{ marginTop: "15px" }}>
                <DecidedSeverity severity="high" />
                <DecidedSeverity severity="medium" />
                <DecidedSeverity severity="false" />
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" color="text.bold">
                Duplication
              </Typography>
              <Autocomplete
                onChange={(e) => {
                  decideDuplication(e.target.ariaLabel);
                  setValue(e.target.ariaLabel);
                }}
                id="duplication"
                values={issues.map((e) => e.title)}
                value={value}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Decision;
