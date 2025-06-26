import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { beforeLoginPostApi } from "../services/ApiServices";
import "../style/CommonStyle/GeneralForm.css"
import "../style/LoginPage.css"
const Login = ({setIsAuthenticated}) => {

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    message: "",
  });

  const navigate = useNavigate();

  const updateField = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const { email, password, message } = formState;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginRequestBody = 
      {
        email,
        password,
      };
      const jsonHeader = {
        "Content-Type": "application/json", 
      };
  
      const response = await beforeLoginPostApi("/login", loginRequestBody, jsonHeader);
        if (response.status === 200) {
          localStorage.clear();
          localStorage.setItem("token", response.data.token); 
          const hasCompletedLandingPage = response.data.hasCompletedLandingPage;
          console.log(hasCompletedLandingPage);
          setIsAuthenticated(true);
          navigate(hasCompletedLandingPage ? "/home" : "/landingPage");
        } else {
          updateField("message", response.data.message);
        }

    } catch (error) {
      const errorMsg = error?.response?.data?.message === "Bad credentials" ? "Wrong Username or Password" : error?.response?.data?.message
      console.log("Error response: ", error?.response);
      updateField("message", errorMsg);
    }
  };
  
  return (
    <div className="login-page">
      <div className="form-section lessData-form-padding">
      <form onSubmit={handleLogin}>  
      <h2>Log In</h2>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => updateField("email", e.target.value)}
            autoComplete="username" 
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => updateField("password", e.target.value)}
            autoComplete="current-password" 
          />
        </label>
        <button type = "submit">LOGIN</button>
        <p></p>
        <div className = "login-page-register">
           No account yet?
          <Link to="/register" className="register-link-style"> Register </Link>
        </div>
      </form>
      {message && <p className="warning-text warning-pop-up-message-animation">{message}</p>}
    </div>
    </div>
  );
};

export default Login;
