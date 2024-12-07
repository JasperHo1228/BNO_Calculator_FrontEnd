import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ResendToken from "./components/ResendToken";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
   false // Check localStorage for authentication
  );
   console.log(isAuthenticated)
   
   const handleLogout = () => {
    localStorage.removeItem("email");  // Clear only specific item
    localStorage.removeItem("password"); // Also remove the password, if needed
    setIsAuthenticated(false); // Explicitly update the state to false
  };

  return (
    <Router>
      <div>
        <nav>
          {!isAuthenticated ? (
            <>
              <Link to="/">Login</Link> | <Link to="/register">Register</Link> |{" "}
              <Link to="/resend-token">Resend Token</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resend-token" element={<ResendToken />} />
          <Route path="landingPage" element={<LandingPage/>}/>
          <Route
            path="/home"
            element={
              <PrivateRoute
                element={Home}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/landingPage"
            element={
              <PrivateRoute
                element={LandingPage}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
