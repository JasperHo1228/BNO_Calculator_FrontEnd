import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ActivateAccount from "./components/ActivateAccount";
import ResendToken from "./components/ResendToken";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Login</Link> | <Link to="/register">Register</Link> |{" "}
          <Link to="/resend-token">Resend Token</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/landingPage" element={<LandingPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
