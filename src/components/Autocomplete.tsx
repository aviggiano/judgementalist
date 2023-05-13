import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Popper } from "@mui/material";

const CustomerPopper = (props: any) => {
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

export default function AutocompleteComponent({
  id,
  options,
  onSelect,
}: {
  id: string;
  options: string[];
  onSelect?: (props: any) => void;
}) {
  return (
    <Autocomplete
      id={id}
      options={options}
      getOptionLabel={(option) => option}
      onSelect={onSelect}
      renderInput={(params) => <TextField {...params} margin="normal" />}
      PopperComponent={(props) => <CustomerPopper {...props} />}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue, { insideWords: true });
        const parts = parse(option, matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
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
