import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

export const TextField = ({
  name,
  label,
  type,
  onChange,
  value,
  required,
  disabled,
  ...props
}: TextFieldProps) => (
  <MuiTextField
    name={name}
    label={label}
    type={type}
    onChange={onChange}
    value={value}
    variant="outlined"
    required={required}
    disabled={disabled}
    sx={{ marginBottom: "20px", flex: 1, marginRight: "20px" }}
    {...props}
  />
);
