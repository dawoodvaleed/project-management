import { FormEvent, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(10),
  paddingRight: theme.spacing(10),
  textAlign: "center",
}));

type LoginProps = { showNavigation: Function };

export const Login = ({ showNavigation }: LoginProps) => {
  useLayoutEffect(() => {
    showNavigation(false);
  }, []);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { email, password } = loginInfo;

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (email && password) {
      try {
        const { data } = await api.post("/auth/login", loginInfo);
        if (data) {
          Cookies.set("authToken", data.token);
          Cookies.set("permissions", data.role.permissions.concat(',permissions'));
          navigate("/");
          showNavigation(true);
        }
      } catch (err: any) {
        setError(err?.response?.data);
      }
    }
  };

  const onChange = ({ currentTarget }: any) => {
    setLoginInfo({ ...loginInfo, [currentTarget.id]: currentTarget.value });
  };

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      direction="column"
      alignItems="center"
      sx={{ minHeight: "80vh" }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        direction="column"
        component={Paper}
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={login}>
          <Item>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={onChange}
              value={email}
              required
            />
          </Item>
          <Item>
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={onChange}
              value={password}
              variant="outlined"
              required
            />
          </Item>
          {error && (
            <Item>
              <span style={{ color: "red" }}>{error}</span>
            </Item>
          )}
          <Item>
            <Button type="submit" variant="contained">
              Log In
            </Button>
          </Item>
        </form>
      </Grid>
    </Grid>
  );
};
