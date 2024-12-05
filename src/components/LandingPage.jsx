import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { afterLoginApi } from "../api"; 
import { getAuthHeader } from "../utils/authUtils"; 

const LandingPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({ bnoValidDate: "", firstArrivalDate: "" });
  const [message, setMessage] = useState(null); // Handle all message states
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      try {
        const authHeader = getAuthHeader(); // Use the utility function to get the auth header

        const isReturningUser = localStorage.getItem("isReturningUser");
        setIsNewUser(!isReturningUser); // Set new user status

        const response = await afterLoginApi.get("/landingPage", {
          headers: {
            Authorization: authHeader,
          },
        });
        localStorage.setItem("authHeader", authHeader);
        const username = response.data; // Assuming response contains username
        const title = "Welcome to BNO Calculator App";
        const msg = "Let's get started!!!";

        const landingPageMessage = { username, title, msg };
        setMessage(landingPageMessage);
      } catch (error) {
        console.error("Error fetching landing page data:", error);
        setMessage({ error: "Failed to load landing page. Please try again later." });
      }
    };

    authenticateAndFetchData();
  }, [navigate, message]); 

  useEffect(() => {
    if (!isNewUser && message) {
      navigate("/home"); 
    }
  }, [isNewUser, message, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authHeader = getAuthHeader(); 

    const requestBody = {
      bno_valid_date: formData.bnoValidDate,
      first_arrival_date: formData.firstArrivalDate,
    };

    try {
      const response = await afterLoginApi.post("/initialDataProcessing", requestBody, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });
      setMessage(response.data); 
      localStorage.setItem("isReturningUser", true); 
      setIsNewUser(false); 
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage({ error: "Failed to submit data. Please try again later." });
    }
  };

  return (
    <div>
      {message ? (
        message.error ? (
          <p>{message.error}</p>
        ) : (
          <>
            <h2>Hi, {message.username}! {message.title}</h2>
            <h3>{message.msg}</h3>
          </>
        )
      ) : (
        <p>Loading...</p>
      )}

      {isNewUser && (
        <>
          <p>Please provide your details:</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                BNO Valid Date:
                <input
                  type="date"
                  name="bnoValidDate"
                  value={formData.bnoValidDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                First Arrival Date:
                <input
                  type="date"
                  name="firstArrivalDate"
                  value={formData.firstArrivalDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LandingPage;
