import {
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useEffect, useState } from "react";
import { UserModalProps } from "../../utils/commonTypes";

export const UserModal = ({
  data,
  type,
  dataRef,
  roleData,
}: UserModalProps) => {
  const [role, setRole] = useState(data?.role.id || roleData[0].id);
  // const [name, setName] = useState(data?.description);
  const [userName, setUserName] = useState(data?.username);
  const [password, setPassword] = useState(data?.password);
  const [phone, setPhone] = useState(data?.contactNumber);
  const [email, setEmail] = useState(data?.email);
  const [address, setAddress] = useState(data?.address);
  // const [active, setActive] = useState(data?.description);

  const handleChange = (
    key: any,
    value: string,
    setState: (args: any) => void
  ) => {
    setState(value);
    dataRef.current[key] = value;
  };

  useEffect(() => {
    dataRef.current = {
      roleId: roleData[0].id,
    };
    if (data) {
      dataRef.current = {
        roleId: data.role.id,
        username: data.username,
        password: data.password,
        contactNumber: data.contactNumber,
        email: data.email,
        address: data.address,
      };
    }
  }, []);

  return (
    <Grid container direction="column" rowGap={2}>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Role:</p>
        </Grid>
        <Grid item md={6}>
          <Select
            id="role-select-small"
            value={role}
            onChange={(e) => handleChange("roleId", e.target.value, setRole)}
            label="Role"
            fullWidth
            disabled={type === "READ"}
          >
            {roleData.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>User Name:</p>
        </Grid>
        <Grid item md={6}>
          <TextField
            id="userName"
            label="User Name"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChange("username", e.target.value, setUserName)
            }
            value={userName}
            disabled={type === "READ"}
            required
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Password:</p>
        </Grid>
        <Grid item md={6}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            onChange={(e) =>
              handleChange("password", e.target.value, setPassword)
            }
            value={password}
            disabled={type === "READ"}
            required
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Phone:</p>
        </Grid>
        <Grid item md={6}>
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            // type="number"
            onChange={(e) =>
              handleChange("contactNumber", e.target.value, setPhone)
            }
            value={phone}
            disabled={type === "READ"}
            // required
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Email:</p>
        </Grid>
        <Grid item md={6}>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange("email", e.target.value, setEmail)}
            value={email}
            disabled={type === "READ"}
            required
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={4}>
          <p>Address:</p>
        </Grid>
        <Grid item md={6}>
          <TextareaAutosize
            style={{ width: "100%" }}
            placeholder="Address"
            value={address}
            onChange={(e) =>
              handleChange("address", e.target.value, setAddress)
            }
            minRows={4}
            disabled={type === "READ"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
