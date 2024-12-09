import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { afterLoginApi } from "../api";
import { getAuthHeader } from "../utils/authUtils";
import "../style/Home.css";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authHeader = getAuthHeader();
        const response = await afterLoginApi.get("/home", {
          headers: {
            Authorization: authHeader,
          },
        });
        localStorage.setItem("authHeader", authHeader);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {data ? (
        <div className="cards-container">
          {/* Total Days Used Card */}
          <div className="card">
            <h3>Total Days Used</h3>
            <p>{data.total_day_have_used}</p>
          </div>

          {/* This Year Used Card */}
          <div className="card">
            <h3>This Year Used</h3>
            <p>{data.this_year_have_used}</p>
          </div>

          {/* Yearly Usage Records Cards */}
          <div className="record-section">
            <h3>Yearly Usage Records</h3>
            {data.each_year_have_used_record.map((record, index) => (
              <div className="card record-card" key={index}>
                <p><strong>Start Date:</strong> {record.start_date}</p>
                <p><strong>End Date:</strong> {record.end_date}</p>
                <p><strong>Total Days:</strong> {record.total_each_day}</p>
              </div>
            ))}
          </div>

          {/* Message Card */}
          <div className="card message-card">
            <h3>Message</h3>
            <p>{data.break_the_rule_message}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
