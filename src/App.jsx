import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResendToken from "./pages/ResendToken";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./features/authentications/components/PrivateRoute";
import ActivateAccount from "./pages/ActivateAccount"
import "./style/CommonStyle/NavBar.css";
import CalendarIcon from "./assets/calendar-color-icon.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const email = localStorage.getItem("email");
    const expiry = localStorage.getItem("expiry");
    if (!email || !expiry) return false;

    const isExpired = Date.now() > parseInt(expiry, 10);
    if (isExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  });

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("expiry");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <nav>
          <div className="navbar">
          <Link className= "logo-link" to="/home">
            <div className="logo-container">
                <LazyLoadImage src={CalendarIcon} alt="Calendar Icon" className="calendar-icon" />
                <h3 className="logo">BNOCalTor</h3>
            </div>
            </Link>
            {isAuthenticated && (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resend-token" element={<ResendToken />} />
          <Route path="/activate-account" element={<ActivateAccount />} />
          <Route
            path="/home"
            element={
              <PrivateRoute element={Home} isAuthenticated={isAuthenticated} />
            }
          />
          <Route
            path="/landingPage"
            element={
              <PrivateRoute element={LandingPage} isAuthenticated={isAuthenticated} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
