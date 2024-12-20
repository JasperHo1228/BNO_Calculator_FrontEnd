import React, { useState, useEffect } from "react";
import { getAuthHeader } from "../utils/authUtils";
import { afterLoginGetApi, afterLoginPostParamApi } from "../services/ApiServices";
import { useNavigate } from "react-router-dom"; 
import '../style/GetAllTravel.css';

const GetAllTravel = () => {
    const [data, setData] = useState({ all_year_data_range: [] });
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authHeader = getAuthHeader();
                const response = await afterLoginGetApi("/getSpecificYearInfo", { Authorization: authHeader });
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = async (startDate, endDate) => {
        try {
            const authHeader = getAuthHeader();
            const travelData = await afterLoginPostParamApi("/getSpecificYearInfoDetail", { Authorization: authHeader }, startDate, endDate);
        
            navigate('/travelDataDetail', { state: { travelData } });
        } catch (error) {
            console.error("Error fetching travel data:", error);
        }
    };

    return (
        <div className="getAlltravelData-page">
            {data.all_year_data_range.length > 0 ? (
                <div className="cards-container-alltravelData">
                    {data.all_year_data_range.map((yearRange, index) => (
                        <div 
                            className="travel-card" 
                            key={index} 
                            onClick={() => handleCardClick(yearRange.start_date, yearRange.end_date)} 
                        >
                            <h3>Year {index + 1}</h3>
                            {yearRange.start_date}
                            <br />
                            {yearRange.end_date}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="loading-text">Loading...</p>
            )}
        </div>
    );
};

export default GetAllTravel;