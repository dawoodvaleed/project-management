import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Vendor } from "./pages/Vendor";
import PrivateRoutes from "./components/PrivateRoutes";
import { Nav } from "./components/Navbar";
import { SideBar } from "./components/Navbar/SideBar";
import { useState } from "react";

function App() {
  const [sidemenu, setSidemenu] = useState(true);
  const showsidemenu = () => setSidemenu(!sidemenu);
  const [showNavigation, setShowNavigation] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        {showNavigation && <Nav showsidemenu={showsidemenu} />}
        <div>
          {showNavigation && (
            <SideBar showsidemenu={showsidemenu} sidemenu={sidemenu} />
          )}
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
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
