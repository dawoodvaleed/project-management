import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api";

export const Login = () => {
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
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [currentTarget.id]: currentTarget.value });
  };

  return (
    <form>
      <input
        type="email"
        id="email"
        onChange={onChange}
        value={email}
        required
      />
      <input
        type="password"
        id="password"
        onChange={onChange}
        value={password}
        required
      />
      <button onClick={login} type="button">
        Log in
      </button>
    </form>
  );
};
