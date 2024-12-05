import React, { useState } from "react";
import {api} from "../api"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
      const response = await api.post(
        "/login", 
        {
          email: email,  
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );

      if (response.status === 200) {
        localStorage.clear();
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        const hasCompletedLandingPage = response.data.hasCompletedLandingPage;
        console.log(hasCompletedLandingPage)
        navigate(hasCompletedLandingPage ? "/home" : "/landingPage");
      } else {
        setMessage(response.data.message);
      }
        } catch (error) {
      setMessage(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message}
    </div>
  );
};

export default Login;
