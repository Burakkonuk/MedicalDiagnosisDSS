import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Algorithm from "./pages/Algorithm";
import LayoutTemplate from "./pages/LayoutTemplate";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./App.css";
import AppHeader from "./Components/Header";
import AppFooter from "./Components/Footer";
import PageContent from "./Components/PageContent";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        {window.location.pathname == "/login" ||
        window.location.pathname == "/register"
          ? false
          : true && <AppHeader />}
        {window.location.pathname == "/login" ||
        window.location.pathname == "/register"
          ? false
          : true && <PageContent />}
        {window.location.pathname == "/login" ||
        window.location.pathname == "/register"
          ? false
          : true && <AppFooter />}
      </BrowserRouter>
    </div>
  );
}

export default App;
