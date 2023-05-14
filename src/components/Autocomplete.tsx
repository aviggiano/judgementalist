import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Popper } from "@mui/material";

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

export default function AutocompleteComponent({
  id,
  value,
  values,
  onChange,
}: {
  id: string;
  values: string[];
  value?: string;
  onChange?: (props: any) => void;
}) {
  return (
    <Autocomplete
      id={id}
      options={values}
      getOptionLabel={(option) => option}
      onChange={onChange}
      value={value}
      renderInput={(params) => <TextField {...params} margin="normal" />}
      PopperComponent={(props) => <CustomPopper {...props} />}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue, { insideWords: true });
        const parts = parse(option, matches);

        return (
          <li key={option} {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  aria-label={option}
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
