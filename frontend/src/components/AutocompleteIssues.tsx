import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Popper } from "@mui/material";
import { Issue } from "../context/IssuesContext";

const CustomPopper = (props: any) => {
  const modifiers = [
    {
      name: "flip",
      enabled: false,
    },
  ];

  return (
    <Popper
      {...props}
      modifiers={modifiers}
      popperOptions={{
        placement: "top",
      }}
    />
  );
};

export default function AutocompleteIssues({
  id,
  value,
  values,
  onChange,
}: {
  id: string;
  values: Issue[];
  value?: Issue;
  onChange?: (props: any) => void;
}) {
  return (
    <Autocomplete
      id={id}
      options={values}
      getOptionLabel={(option) => option.decidedDuplication || option.title}
      onSelect={onChange}
      groupBy={(option) => option.decidedDuplication || "N/A"}
      value={value}
      renderInput={(params) => <TextField {...params} margin="normal" />}
      PopperComponent={(props) => <CustomPopper {...props} />}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue, { insideWords: true });
        const parts = parse(option.title, matches);

        return (
          <li {...props} key={option.file}>
            <div>
              {parts.map((part) => (
                <span
                  key={option.file}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}
