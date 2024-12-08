import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../utils/authUtils";
import { afterLoginGetApi, afterLoginPostApi } from "../services/ApiServices";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../style/LandingPage.css";
import "../style/CommonStyle/GeneralForm.css"
import "../style/CommonStyle/ErrorMsg.css"
import OmgIcon from "../assets/omg_error.svg"

const LandingPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({ bnoValidDate: "", firstArrivalDate: "" });
  const [message, setMessage] = useState(null);
  const [currentStep, setCurrentStep] = useState(0); // Animation Step Tracker
  const [isFailToload, setFailToload] = useState(false);
  const navigate = useNavigate();

  // Helper function: Validate dates
  const isValidDate = (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  };

  // Fetch data on component mount
  useEffect(() => {
    const authenticateAndFetchData = async () => {
      try {
        const authHeader = getAuthHeader();
        const isReturningUser = localStorage.getItem("isReturningUser");
        setIsNewUser(!isReturningUser);

        const response = await afterLoginGetApi("/landingPage", { Authorization: authHeader });
        localStorage.setItem("authHeader", authHeader);

        setMessage({
          username: response.data, // Assuming response contains username
          title: "Welcome to BNO Calculator App",
          msg: "Let's get started!!!",
        });
       
        setCurrentStep(1); // Start animation
      } catch (error) {
        setFailToload(true)
        console.error("Error fetching landing page data:", error);
        setMessage({ error: "Failed to load landing page. Please try again later." });
      }
    };

    authenticateAndFetchData();
  }, []);

  // Animation steps
  useEffect(() => {
    if (currentStep === 1) setTimeout(() => setCurrentStep(2), 2000);
    if (currentStep === 2) setTimeout(() => setCurrentStep(3), 2500);
  }, [currentStep]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authHeader = getAuthHeader();

    try {
      const response = await afterLoginPostApi(
        "/initialDataProcessing",
        {
          bno_valid_date: formData.bnoValidDate,
          first_arrival_date: formData.firstArrivalDate,
        },
        {
          Authorization: authHeader,
          "Content-Type": "application/json",
        }
      );

      setMessage(response.data);
      localStorage.setItem("isReturningUser", true);
      navigate("/home");
      setIsNewUser(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage({ error: "Failed to submit data. Please try again." });
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-message-section">
        {message && !message.error && (
          <>
            <h1 className={`landing-page-fade-step ${currentStep === 1 ? "landing-page-fade-in" : "landing-page-fade-out"}`}>
              Hi, {message.username}!
            </h1>
            <h1 className={`landing-page-fade-step ${currentStep === 2 ? "landing-page-fade-in" : "landing-page-fade-out"}`}>
              {message.title}
            </h1>
          </>
        )}
        {message?.error && isFailToload && 
        <div className="error-msg-container">
           <LazyLoadImage className= "omg-icon" src={OmgIcon} alt="OmgIcon" effect="blur"/>
           <div className="message-error"> 
            {message.error}
           </div>
        </div>
        }
      </div>

      {isNewUser && currentStep === 3 && (
        <div className="form-section lessData-form-padding landing-page-form-animation landing-page-form-pop-up">
          <form onSubmit={handleSubmit}>
            <div className="landing-page-form-title">Please provide your visa date and UK arrival date.</div>
            <br/>
            <div>
              <label>
                <div className="form-title-field">BNO Valid Date</div>
                <input
                  type="date"
                  name="bnoValidDate"
                  value={formData.bnoValidDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isValidDate(value)) handleInputChange(e);
                  }}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(value)) handleInputChange(e);
                  }}
                  required
                />
              </label>
            </div>
            <div>
              <label>
              <div className="form-title-field"> First Arrival Date </div>
                <input
                  type="date"
                  name="firstArrivalDate"
                  value={formData.firstArrivalDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isValidDate(value)) handleInputChange(e);
                  }}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(value)) handleInputChange(e);
                  }}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit</button>
            <p></p>
            {message?.error && !isFailToload &&
              <div className="error-msg-container-landingPage">
                <div className="message-error-landingPage"> 
                    {message.error}
              </div>
            </div>
             }
          </form>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
