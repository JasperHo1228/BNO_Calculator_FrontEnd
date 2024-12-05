import React, { useState } from "react";
import {api} from "../api";

function ActivateAccount() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleActivate = async () => {
    try {
      const response = await api.get(`/user-activate-account?token=${token}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Account activation failed.");
    }
  };

  return (
    <div>
      <h2>Activate Account</h2>
      <input
        type="text"
        placeholder="Activation Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleActivate}>Activate</button>
      <p>{message}</p>
    </div>
  );
}

export default ActivateAccount;
