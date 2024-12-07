import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../utils/authUtils";
import { afterLoginGetApi, afterLoginPostApi } from "../services/ApiServices";
import "../style/LandingPage.css";

const LandingPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({ bnoValidDate: "", firstArrivalDate: "" });
  const [message, setMessage] = useState(null);
  const [currentStep, setCurrentStep] = useState(0); // Animation Step Tracker
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      try {
        const authHeader = getAuthHeader();

        const isReturningUser = localStorage.getItem("isReturningUser");
        setIsNewUser(!isReturningUser);
        const jsonHeaderAuth = { Authorization: authHeader };

        const response = await afterLoginGetApi("/landingPage", jsonHeaderAuth);
        localStorage.setItem("authHeader", authHeader);

        const username = response.data; // Assuming response contains username
        const title = "Welcome to BNO Calculator App";
        const msg = "Let's get started!!!";

        setMessage({ username, title, msg });

        // Start animation after fetching data
        setCurrentStep(1); // Begin with first animation
      } catch (error) {
        console.error("Error fetching landing page data:", error);
        setMessage({ error: "Failed to load landing page. Please try again later." });
      }
    };

    authenticateAndFetchData();
  }, []);

  useEffect(() => {
    // Handle the timing of animations
    if (currentStep === 1) {
      setTimeout(() => setCurrentStep(2), 2000); // Step 1: Fade in username
    } else if (currentStep === 2) {
      setTimeout(() => setCurrentStep(3), 2500); // Step 2: Fade in welcome message
    }
  }, [currentStep]);

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
      const jsonHeaderAuth = {
        Authorization: authHeader,
        "Content-Type": "application/json",
      };
      const response = await afterLoginPostApi("/initialDataProcessing", requestBody, jsonHeaderAuth);
      setMessage(response.data);
      localStorage.setItem("isReturningUser", true);
      navigate("/home");
      setIsNewUser(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage({ error: "Failed to submit data. Please try again later." });
    }
  };

  return (
    <div className="landing-page">
      <div className="message-section">
        {message && !message.error && (
          <>
            <h1 className={`fade-step ${currentStep === 1 ? "fade-in" : "fade-out"}`}>
              Hi, {message.username}!
            </h1>
            <h1 className={`fade-step ${currentStep === 2 ? "fade-in" : "fade-out"}`}>
              {message.title}
            </h1>
          </>
        )}
        {message?.error && <p>{message.error}</p>}
      </div>
      {isNewUser && currentStep === 3 && (
        <>
        <p className="form-title">Please provide your visa date and UK arrival date.</p>
        <div className="form-section pop-up">
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
        </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
