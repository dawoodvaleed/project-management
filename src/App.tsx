import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
  const [showNavigation, setShowNavigation] = useState(true);

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
                <Route element={<Customer />} path="/customer" />
                <Route element={<Item />} path="/item" />
                <Route element={<Measurement />} path="/measurement" />
                <Route element={<Project />} path="/project" />
                <Route element={<Role />} path="/security/role" />
                <Route element={<User />} path="/security/user" />
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
