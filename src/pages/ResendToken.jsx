import React, { useState } from "react";
import { beforeLoginPostParamApi } from "../services/ApiServices";
import "../style/CommonStyle/GeneralForm.css";
import "../style/ResendTokenPage.css";

function ResendToken() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode ] = useState("");
  const handleResend = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await beforeLoginPostParamApi("/resend-token", email); // Send email in the request body
      setMessage(response.data.message);
      setStatusCode(response.data.status)
      console.log(response.data.status)
    } catch (error) {
      setStatusCode(error?.response?.status)
      console.log(error?.response?.status)
      setMessage(
        error.response?.data?.message || "Resending token failed. Please try again."
      );
    }
  };

  return (
    <div className="resend-token-page">
      <div className="form-section resend-token-form-padding">
        <form onSubmit={handleResend}>
          <h2>Resend Activation Token</h2>
          <label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Resend</button>
          <div>{ 
            message &&
            <p className={`warning-text ${statusCode !== "200" 
              ? 'warning-pop-up-message-animation'
              : 'successful-pop-up-message-animation'
            }`}>
              {message}
            </p>
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResendToken;
