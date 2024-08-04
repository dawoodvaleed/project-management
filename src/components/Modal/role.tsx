import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ModalChildProps } from "../../utils/commonTypes";

export const RoleModal = ({ data, type, dataRef }: ModalChildProps) => {
  const [roleName, setRoleName] = useState(data?.name);
  const [desc, setDesc] = useState(data?.description);
  const [status, setStatus] = useState(
    data?.staus === false ? "deactive" : "active"
  );

  const handleChange = (value: string, setState: (args: any) => void) =>
    setState(value);

  useEffect(() => {
    if (data) {
      dataRef.current = {
        name: data.name,
        description: data.description,
        staus: data.staus,
      };
    }
  }, []);

  return (
    <Grid container direction="column" rowGap={2}>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Company Name:</p>
        </Grid>
        <Grid item md={6}>
          <Select
            id="company-name-select-small"
            value={"companyName"}
            label="Company Name"
            fullWidth
            disabled
          >
            <MenuItem value="companyName">Arch Vision Interior</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Role Name:</p>
        </Grid>
        <Grid item md={6}>
          <TextField
            id="roleName"
            label="Role Name"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange(e.target.value, setRoleName)}
            value={roleName}
            required
            disabled={type === "READ"}
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Description:</p>
        </Grid>
        <Grid item md={6}>
          <TextField
            id="desc"
            label="Description"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange(e.target.value, setDesc)}
            value={desc}
            disabled={type === "READ"}
            // required
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Status:</p>
        </Grid>
        <Grid item md={6}>
          <Select
            id="status-select-small"
            value={status}
            label="Status"
            fullWidth
            onChange={(e) => handleChange(e.target.value, setStatus)}
            disabled={type === "READ"}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="deactive">Deactive</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
};
