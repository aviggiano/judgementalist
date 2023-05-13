import { Issue } from "../services/issues";
import { Chip } from "@mui/material";

function Severity({ issue, ...rest }: { issue: Issue }) {
  const color =
    issue.severity === "high"
      ? "error"
      : issue.severity === "medium"
      ? "warning"
      : "default";
  return <Chip label={issue.severity} color={color} {...rest} />;
}

export default Severity;
