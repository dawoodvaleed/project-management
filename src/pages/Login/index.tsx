import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textAlign: "center",
}));

type LoginProps = { showNavigation: Function };

export const Login = ({ showNavigation }: LoginProps) => {
  useLayoutEffect(() => {
    showNavigation(false);
  }, []);

  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { email, password } = loginInfo;

  const login = async () => {
    if (email && password) {
      try {
        const { data } = await api.post("/auth/login", loginInfo);
        if (data) {
          Cookies.set("authToken", data.token);
          navigate("/");
          showNavigation(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onChange = ({ currentTarget }: any) => {
    setLoginInfo({ ...loginInfo, [currentTarget.id]: currentTarget.value });
  };

  return (
    <Grid container component="main" justifyContent="center">
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        direction="column"
        component={Paper}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Item>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={onChange}
            value={email}
            required
          />
        </Item>
        <Item>
          <TextField
            type="password"
            id="password"
            label="Password"
            onChange={onChange}
            value={password}
            variant="outlined"
            required
          />
        </Item>
        <Item>
          <Button onClick={login} variant="contained">
            Log In
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
};
