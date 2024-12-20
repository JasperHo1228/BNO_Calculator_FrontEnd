import React, { useState, useEffect } from "react";
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
            <h3 className="card-general-title">Total Days Used</h3>
            <p className={data.total_day_have_used > 450 ? "each-year-warning-text" : "each-year-safe-text"}>{data.total_day_have_used}</p>
          </div>

          {/* This Year Used Card */}
          <div className="card">
            <h3 className="card-general-title">This Year Used</h3>
            <p className={data.this_year_have_used > 180 ? "each-year-warning-text" : "each-year-safe-text"}>{data.this_year_have_used}</p>
          </div>

          {/* Yearly Usage Records Cards */}
          <div className="record-section">
            <h3 className="yearly-text-record-title">Yearly Usage Records</h3>
            {data.each_year_have_used_record.map((record, index) => (
              <div className="card record-card" key={index}>
                <p className="normal-card-text"><strong className="card-title">Start Date:</strong> <span className="each-year-record-text">{record.start_date}</span></p>
                <p className="normal-card-text"><strong className="card-title">End Date:</strong> <span className="each-year-record-text">{record.end_date}</span></p>
                <p className="normal-card-text"><strong className="card-title">Total Days:</strong> <span className={record.total_each_day > 180 ?  "each-year-warning-text" : "each-year-safe-text"}>{record.total_each_day}</span></p>
              </div>
            ))}
          </div>

          {/* Message Card */}
          <div className="card message-card">
            <h3 className="message-title">Message</h3>
            <p className={data.break_the_rule_message.includes("safe") ? "safe-text" : "warning-text"}>{data.break_the_rule_message}</p>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default Home;
