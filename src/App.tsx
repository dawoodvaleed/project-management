import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Vendor } from "./pages/Vendor";

import PrivateRoutes from "./components/PrivateRoutes";
import { DrawerHeader, NavBar } from "./components/Navbar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

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
                <Route element={<Vendor />} path="/vendor" />
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
