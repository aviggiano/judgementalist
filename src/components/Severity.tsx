import { Issue } from "../services/issues";
import { Chip } from "@mui/material";

function Severity({
  issue,
  variant,
  useDecidedSeverity,
}: {
  issue: Issue;
  variant?: any;
  useDecidedSeverity?: boolean;
}) {
  const key = useDecidedSeverity ? "decidedSeverity" : "severity";
  const color =
    issue[key] === "high"
      ? "error"
      : issue[key] === "medium"
      ? "warning"
      : "default";
  return (
    <Chip
      sx={{
        width: "80px",
        textDecoration: variant === "outlined" ? "line-through" : "inherit",
      }}
      label={issue[key]}
      color={color}
      variant={variant}
    />
  );
}

export default Severity;
