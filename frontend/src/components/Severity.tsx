import { Chip } from "@mui/material";
import { Issue } from "../context/IssuesContext";

function Severity({ issue, variant }: { issue: Issue; variant?: any }) {
  const color =
    issue.severity === "high"
      ? "error"
      : issue.severity === "medium"
      ? "warning"
      : "default";
  return (
    <Chip
      size="small"
      sx={{
        width: "80px",
        textDecoration: variant === "outlined" ? "line-through" : "inherit",
      }}
      label={issue.severity}
      color={color}
      variant={variant}
    />
  );
}

export default Severity;
