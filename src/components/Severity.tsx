import { Issue } from "../services/issues";
import { Chip } from "@mui/material";

function Severity({ issue, variant }: { issue: Issue; variant?: any }) {
  const color =
    issue.severity === "high"
      ? "error"
      : issue.severity === "medium"
      ? "warning"
      : "default";
  return <Chip label={issue.severity} color={color} variant={variant} />;
}

export default Severity;
