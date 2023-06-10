import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Algorithm from "../../pages/Algorithm";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        {" "}
      </Route>
      <Route path="/profile" element={<Profile />}>
        {" "}
      </Route>
      <Route path="/diagnose" element={<Algorithm />}>
        {" "}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
