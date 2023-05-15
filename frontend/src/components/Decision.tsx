import { useContext } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { Issue, IssuesContext, Severity } from "../context/IssuesContext";
import Autocomplete from "./AutocompleteIssues";

function Decision({ issue }: { issue: Issue }) {
  const { issues, updateIssue } = useContext(IssuesContext);

  function DecidedSeverity({ decidedSeverity }: { decidedSeverity: Severity }) {
    const color =
      decidedSeverity === "high"
        ? "error"
        : decidedSeverity === "medium"
        ? "warning"
        : "default";

    return (
      <Chip
        size="small"
        sx={{ cursor: "pointer", width: "100%" }}
        onClick={() => updateIssue({ ...issue, decidedSeverity })}
        label={decidedSeverity}
        color={color}
        variant={
          issue.decidedSeverity === decidedSeverity ? "filled" : "outlined"
        }
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
                <DecidedSeverity decidedSeverity="high" />
                <DecidedSeverity decidedSeverity="medium" />
                <DecidedSeverity decidedSeverity="false" />
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" color="text.bold">
                Duplication
              </Typography>
              <Autocomplete
                onChange={(e) => {
                  const decidedDuplication = e.target.value;

                  const existingIssue = issues.find(
                    (i: Issue) => i.decidedDuplication === decidedDuplication
                  );

                  const decidedSeverity =
                    existingIssue?.decidedSeverity || issue.decidedSeverity;

                  console.log(decidedDuplication);

                  updateIssue({
                    ...issue,
                    decidedSeverity,
                    decidedDuplication,
                  });
                }}
                id="duplication"
                values={issues.sort((a, b) =>
                  (b.decidedDuplication || "").localeCompare(
                    a.decidedDuplication || ""
                  )
                )}
                value={issue}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Decision;
