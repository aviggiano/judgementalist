import { useContext } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { Issue, IssuesContext, Severity } from "../context/IssuesContext";
import HelpIcon from "@mui/icons-material/Help";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Autocomplete from "./AutocompleteIssues";

function Decision({ issue }: { issue: Issue }) {
  const { issues, updateIssue } = useContext(IssuesContext);

  const Help = issue.decidedDoublecheck ? HelpIcon : HelpOutlineIcon;
  const Star = issue.decidedBest ? StarIcon : StarOutlineIcon;

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
            <Box>
              <Typography
                sx={{ marginBottom: "15px" }}
                variant="h6"
                color="text.bold"
              >
                &nbsp;
              </Typography>
              <Help
                onClick={() =>
                  updateIssue({
                    ...issue,
                    decidedDoublecheck: !issue.decidedDoublecheck,
                  })
                }
                sx={{ cursor: "pointer" }}
              />
              <Star
                onClick={() =>
                  updateIssue({
                    ...issue,
                    decidedBest: !issue.decidedBest,
                  })
                }
                sx={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Decision;
