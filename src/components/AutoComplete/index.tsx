import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Autocomplete as MuiAutocomplete,
  TextField,
} from "@mui/material";
import { ChangeEventHandler } from "react";

type AutocompleteProps = {
  id: string;
  renderInputProps: {
    label: string;
    name: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    required: boolean;
  };
  options: AutoCompleteOption[];
  onChange:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: {
          name: string;
          id: string;
        } | null,
        reason: AutocompleteChangeReason,
        details?:
          | AutocompleteChangeDetails<{
              name: string;
              id: string;
            }>
          | undefined
      ) => void)
    | undefined;
};

export type AutoCompleteOption = { name: string; id: string };

export const Autocomplete = ({
  id,
  renderInputProps,
  options,
  onChange,
}: AutocompleteProps) => {
  return (
    <MuiAutocomplete
      disablePortal
      id={id}
      options={options}
      sx={{ marginRight: "20px", flex: 1 }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option: any) => option.name}
      onChange={onChange}
      renderInput={(params) => <TextField {...renderInputProps} {...params} />}
    />
  );
};
