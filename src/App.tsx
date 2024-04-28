import "./App.css";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

import PrivateRoutes from "./components/PrivateRoutes";
import { DrawerHeader, NavBar } from "./components/Navbar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import { ALL_ROUTES } from "./utils/allRoutes";

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
  const permissionsStr = Cookies.get("permissions") || "";
  const permissions = permissionsStr.split(",") as (keyof typeof ALL_ROUTES)[];

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
                {permissions
                  .filter(
                    (permission) =>
                      ALL_ROUTES[permission] && ALL_ROUTES[permission].route
                  )
                  .map((permission) => ALL_ROUTES[permission].route)}
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
