import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { beforeLoginPostApi } from "../services/ApiServices";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formState;
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
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        const hasCompletedLandingPage = response.data.hasCompletedLandingPage;
        console.log(hasCompletedLandingPage)
        setIsAuthenticated(true); 
        navigate(hasCompletedLandingPage ? "/home" : "/landingPage");
      } else {
        updateField("message", response.data.message);
      }
    } catch (error) {
      console.log("Error response: ", error?.response);
      updateField("message", error?.response?.data?.message);
    }
  };
  
  const { email, password, message } = formState; 

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => updateField("email", e.target.value)}
          autoComplete="username" 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => updateField("password", e.target.value)}
          autoComplete="current-password"  // Add this attribute
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
