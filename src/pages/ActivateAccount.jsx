import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { beforeLoginGetParamApi } from "../services/ApiServices";
import "../style/ActivatePage.css";

function ActivateAccount() {
  const [activationMessage, setActivationMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiCalled = useRef(false); // To track if the API has been called

  // Extract token from query parameters
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    // If token is available and API has not been called
    if (token && !apiCalled.current) {
      apiCalled.current = true; // Mark the API as called

      const activateAccount = async () => {
        try {
          setLoading(true);
          const response = await beforeLoginGetParamApi("/activate-account", token);
          setActivationMessage(response.data.message || "Account activated successfully!");
        } catch (error) {
          const errorMessage =
            error?.response?.data?.message || "An error occurred during account activation.";
          setActivationMessage(errorMessage);
        } finally {
          setLoading(false);
        }
      };

      activateAccount();
    } else if (!token) {
      setActivationMessage("Invalid activation token.");
      setLoading(false);
    }
  }, [token]); // Trigger effect when `token` changes

  // Button text based on the activation message
  const buttonName = activationMessage.includes("time is over")
    ? "Resend Token via Email"
    : "Go to Home Page";

  // Handle button click to navigate based on message content
  const handleButtonClick = () => {
    if (activationMessage.includes("time is over")) {
      navigate("/resend-token");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="activation-page-container">
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="activate-page-message">
          <p
            className={
              activationMessage.includes("successfully")
                ? "success-text"
                : "error-text"
            }
          >
            {activationMessage}
          </p>
          <button onClick={handleButtonClick}>{buttonName}</button>
        </div>
      )}
    </div>
  );
}

export default ActivateAccount;
