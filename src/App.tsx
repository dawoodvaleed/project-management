import "./App.css";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Customer } from "./pages/Customer";
import { Item } from "./pages/Item";

import PrivateRoutes from "./components/PrivateRoutes";
import { DrawerHeader, NavBar } from "./components/Navbar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Project } from "./pages/Projects";
import { Role, User } from "./pages/Security";
import Cookies from "js-cookie";
import { Measurement } from "./pages/Measurement";
import { PERMISSIONS } from "./util";

const theme = createTheme({
  palette: {
    primary: {
      light: "#5e6aaf",
      main: "#36459b",
      dark: "#25306c",
      contrastText: "#fff",
    },
  },
});

function App() {
  const [showNavigation, setShowNavigation] = useState(
    Cookies.get("authToken") ? true : false
  );
  const userpermissions = Cookies.get("permissions") || "";
  const { customers, items, measurements, projects, roles, users } =
    PERMISSIONS;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <BrowserRouter>
          {showNavigation && <NavBar />}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {showNavigation && <DrawerHeader />}
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<Home />} path="/" />
                {userpermissions.includes(customers.name) && (
                  <Route element={<Customer />} path={customers.path} />
                )}
                {userpermissions.includes(items.name) && (
                  <Route element={<Item />} path={items.path} />
                )}
                {userpermissions.includes(measurements.name) && (
                  <Route element={<Measurement />} path={measurements.path} />
                )}
                {userpermissions.includes(projects.name) && (
                  <Route element={<Project />} path={projects.path} />
                )}
                {userpermissions.includes(roles.name) && (
                  <Route element={<Role />} path={roles.path} />
                )}
                {userpermissions.includes(users.name) && (
                  <Route element={<User />} path={users.path} />
                )}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
              <Route
                element={<Login showNavigation={setShowNavigation} />}
                path="/login"
              />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
