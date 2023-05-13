import { useContext, useState } from "react";
import { Issue, Severity } from "../services/issues";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { IssuesContext } from "../context/IssuesContext";
import Autocomplete from "./Autocomplete";

function Decision({ issue }: { issue: Issue }) {
  const { issues, updateIssue } = useContext(IssuesContext);
  const [decidedSeverity, setDecidedSeverity] = useState(issue.decidedSeverity);

  const decideSeverity = (decidedSeverity: Severity) => {
    updateIssue({ ...issue, decidedSeverity });
    setDecidedSeverity(decidedSeverity);
  };

  function SeverityDecision({ severity }: { severity: Severity }) {
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
        variant={decidedSeverity === severity ? "filled" : "outlined"}
      />
    );
  }

  const duplication = issues.map((e) => e.title);
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
                <SeverityDecision severity="high" />
                <SeverityDecision severity="medium" />
                <SeverityDecision severity="false" />
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" color="text.bold">
                Duplication
              </Typography>
              <Autocomplete
                onSelect={(i) => console.log(i.target.value)}
                id="duplication"
                options={duplication}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Decision;
