import { useState } from "react";
import { afterLoginPostApi } from "../services/ApiServices";
import "../style/CommonStyle/GeneralForm.css";
import "../style/AddTravelData.css";

const AddTravelData = () => {
    const [formData, setFormData] = useState({ 
        start_date: "", 
        end_date: "", 
        departure_location: "", 
        arrival_location: "" 
    });
    const [statusCode, setStatusCode] = useState();
    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isValidDate = (value) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(value)) return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
    };
    
    const { start_date, end_date, arrival_location, departure_location } = formData;

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();

      
      const requestBody = { start_date, end_date, arrival_location, departure_location };
  
      try {

          const response = await afterLoginPostApi(
              "/addNewTravelInfo",
              requestBody,{}
          );
          
          // Assuming response.data contains the object with status and message
          setMessage(response.data.message); // Set only the message to display
          setStatusCode(response.data.status);
      } catch (error) {
          console.error("Error submitting data:", error);
          const status = error?.response?.status;
          const errorMessage = error?.response?.data?.message || "An error occurred";
          setMessage(errorMessage); // Set the error message
          setStatusCode(status || "Unknown");
      }
  };
  
  const isSuccessMessage = statusCode === 200 || Number(setStatusCode) === 200;
    return (
        <div className="addTravelData-page">
            <div className="form-section moreData-form-padding">
                <form onSubmit={handleSubmit}>
                    <label>
                        <div className="form-title-field">Travel Start Date</div>
                        <input
                            type="date"
                            name="start_date"
                            value={start_date}
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
                    <label>
                        <div className="form-title-field">Travel End Date</div>
                        <input
                            type="date"
                            name="end_date"
                            value={end_date}
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
                    <label>
                        <div className="form-title-field">Departure Location</div>
                        <input
                            type="text"
                            name="departure_location"
                            placeholder="Departure Location"
                            value={departure_location}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <div className="form-title-field">Arrival Location</div>
                        <input
                            type="text"
                            name="arrival_location"
                            placeholder="Arrival Location"
                            value={arrival_location}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">SUBMIT</button>
                    {message && (
                        <p
                            className={`warning-text ${
                                isSuccessMessage
                                    ? 'addTravel-successful-pop-up-message-animation' 
                                    : 'addTravel-warning-pop-up-message-animation' 
                            }`}
                        >
                            {message}
            
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddTravelData;