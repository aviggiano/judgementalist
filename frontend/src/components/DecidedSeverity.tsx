import { Chip } from "@mui/material";
import { Issue } from "../context/IssuesContext";

function DecidedSeverity({
  issue,
  index,
  variant,
}: {
  issue: Issue;
  index: number;
  variant?: any;
}) {
  const color =
    issue.decidedSeverity === "high"
      ? "error"
      : issue.decidedSeverity === "medium"
      ? "warning"
      : "default";

  const label =
    issue.decidedSeverity === "false"
      ? "false"
      : `${index.toString().padStart(3, "0")}-${issue.decidedSeverity
          ?.charAt(0)
          .toUpperCase()}`;

  return (
    <Chip
      size="small"
      sx={{
        width: "80px",
        textDecoration: variant === "outlined" ? "line-through" : "inherit",
      }}
      label={label}
      color={color}
      variant={variant}
    />
  );
}

export default DecidedSeverity;
