import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ModalChildProps } from "../../utils/commonTypes";

export const RoleModal = ({ data, type, dataRef }: ModalChildProps) => {
  const [roleName, setRoleName] = useState(data?.name);
  const [desc, setDesc] = useState(data?.description);
  const [status, setStatus] = useState(
    data?.status === false ? "deactive" : "active"
  );

  const handleChange = (key: string, value: string, setState: (args: any) => void) => {
    if (dataRef.current === 'status') {
      dataRef.current[key] = value === 'active' ? true : false;
    } else {
      dataRef.current[key] = value
    }
    setState(value);
  }

  useEffect(() => {
    if (data) {
      dataRef.current = {
        name: data.name,
        description: data.description,
        status: data.status,
      };
    }
  }, []);

  return (
    <Grid container direction="column" rowGap={2}>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Company Name:</p>
        </Grid>
        <Grid item md={8}>
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
        <Grid item md={8}>
          <TextField
            id="roleName"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange('name', e.target.value, setRoleName)}
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
        <Grid item md={8}>
          <TextField
            id="desc"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange('description', e.target.value, setDesc)}
            value={desc}
            disabled={type === "READ"}
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Status:</p>
        </Grid>
        <Grid item md={8}>
          <Select
            id="status-select-small"
            value={status}
            fullWidth
            onChange={(e) => handleChange('status', e.target.value, setStatus)}
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
