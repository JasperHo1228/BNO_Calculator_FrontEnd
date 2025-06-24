import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResendToken from "./pages/ResendToken";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./features/authentications/components/PrivateRoute";
import ActivateAccount from "./pages/ActivateAccount";
import AddTravelData from "./pages/AddTravelData";
import GetAllTravel from "./pages/GetAllTravel";
import TravelDataDetail from "./pages/TravelDataDetail"
import "./style/CommonStyle/NavBar.css";
import CalendarIcon from "./assets/calendar-color-icon.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";


function App() {
  
const [isAuthenticated, setIsAuthenticated] = useState(() => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const expiry = localStorage.getItem("expiry");
  if (expiry && Date.now() > parseInt(expiry, 1000)) {
    localStorage.clear();
    return false;
  }

  return true;
});

 
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiry");
  setIsAuthenticated(false);
};


  return (
    <Router>
      <div>
      <nav className="nav-bar-container">
        <div className="horizontal-navbar">
          {/* Logo Section */}
          <Link className="logo-link" to="/home">
            <div className="logo-container">
              <LazyLoadImage src={CalendarIcon} alt="Calendar Icon" className="calendar-icon" />
              <h3 className="logo">BNOCalTor</h3>
            </div>
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="nav-links">
              <Link to="/home" className="navbar-link">Home</Link>
              <Link to="/addTravelData" className="navbar-link">Add Travel Date</Link>
              <Link to="/travellingData" className="navbar-link">Check Travel Data</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
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
          <Route 
            path ="/addTravelData" 
            element={<PrivateRoute element={AddTravelData} isAuthenticated={isAuthenticated}/>} 
               />  
          <Route 
            path ="/travellingData" 
            element={<PrivateRoute element={GetAllTravel} isAuthenticated={isAuthenticated}/>} 
               />  

         <Route path="/travelDataDetail" 
            element={<PrivateRoute element={TravelDataDetail} isAuthenticated={isAuthenticated}/>}
            />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
