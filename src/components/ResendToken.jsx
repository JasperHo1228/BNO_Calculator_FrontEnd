import React, { useState } from "react";
import {api} from "../api";

function ResendToken() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    try {
      const response = await api.post("/user-resend-token", email);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Resending token failed.");
    }
  };

  return (
    <div>
      <h2>Resend Activation Token</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResend}>Resend</button>
      <p>{message}</p>
    </div>
  );
}

export default ResendToken;
