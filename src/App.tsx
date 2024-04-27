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
import { paths, permissions } from "./config/Permissions";
import Cookies from "js-cookie";
import { Measurement } from "./pages/Measurement";

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
  const [showNavigation, setShowNavigation] = useState(Cookies.get("authToken") ? true : false);
  const userpermissions = Cookies.get("permissions") || "";

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
                {userpermissions.includes(permissions.customers.name) && <Route element={<Customer />} path={paths.customer} />}
                {userpermissions.includes(permissions.items.name) && <Route element={<Item />} path={paths.item} />}
                <Route element={<Measurement />} path="/measurement" />
                {userpermissions.includes(permissions.projects.name) && <Route element={<Project />} path={paths.project} />}
                {userpermissions.includes(permissions.roles.name) && <Route element={<Role />} path={paths.role} />}
                {userpermissions.includes(permissions.users.name) && <Route element={<User />} path={paths.user} />}
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
