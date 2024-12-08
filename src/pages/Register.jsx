import React, { useState } from "react";
import {beforeLoginPostApi} from "../services/ApiServices"
import "../style/CommonStyle/GeneralForm.css"
import "../style/RegisterPage.css"

function Register() {
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_type_password: "",
    message: "",
    statusCode: null, // Add this line
  });
  

  const updateField = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const { first_name, last_name, email, password, re_type_password, message, statusCode } = formState;

  const handleRegister = async () => {
    try {
      const registerRequestBody = {
        first_name,
        last_name,
        email,
        password,
        re_type_password,
      };
      console.log("Request Body:", registerRequestBody);
  
      const jsonHeader = {
        "Content-Type": "application/json",
      };
  
      const response = await beforeLoginPostApi("/register", registerRequestBody, jsonHeader);
  
      // Log and update the state with HTTP status and message
      console.log("API Response:", response);
      updateField("message", response.data.message);
      updateField("statusCode", response.status);
    } catch (error) {
      // Extract HTTP status and error message if available
      const status = error?.response?.status;
      const errorMessage = error?.response?.data?.message || "An error occurred";
  
      console.error("Error occurred:", { status, error });
      updateField("message", errorMessage);
      updateField("statusCode", status || "Unknown");
    }
  };
  

  return (
    <div className="register-page">
      <div className="form-section moreData-form-padding">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
          <h2>Register</h2>
          <label>
            <input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => updateField("first_name", e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => updateField("last_name", e.target.value)}
            />
          </label>
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
              autoComplete="new-password"
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Re-type password"
              value={re_type_password}
              onChange={(e) => updateField("re_type_password", e.target.value)}
              autoComplete="new-password"
            />
          </label>
          <button type="submit">REGISTER</button>
          {message && (
            <p
              className={`warning-text ${
                statusCode !== 200
                  ? 'warning-pop-up-message-animation'
                  : 'successful-pop-up-message-animation'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
