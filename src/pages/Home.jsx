import React, { useState, useEffect } from "react";
import { afterLoginApi } from "../api";
import { afterLoginPostApi } from "../services/ApiServices";
import { getAuthHeader } from "../utils/authUtils";
import "../style/Home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
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
      alert("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCalculateBtn = async (id) => {
    const authHeader = getAuthHeader();

    try {
      const response = await afterLoginPostApi(
        `/getTheHighestDayEachYear?id=${id}`,
        {},
        {
          Authorization: authHeader,
          "Content-Type": "application/json",
        }
      );

      const result = response.data;
      console.log("Highest Day:", result);
      alert(`Highest Day: ${result}`);

      // Refresh data after successful calculation
      await fetchData();

    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error submitting data:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="home-page">
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : data ? (
        <div className="cards-container">

          <div className="card">
            <h3 className="card-general-title">Total Days Used</h3>
            <p className={data.total_day_have_used > 450 ? "each-year-warning-text" : "each-year-safe-text"}>
              {data.total_day_have_used}
            </p>
          </div>

          <div className="card">
            <h3 className="card-general-title">This Year Used</h3>
            <p className={data.this_year_have_used > 180 ? "each-year-warning-text" : "each-year-safe-text"}>
              {data.this_year_have_used}
            </p>
          </div>

          <div className="record-section">
            <h3 className="yearly-text-record-title">Yearly Usage Records</h3>
            {data.each_year_have_used_record.map((record, index) => (
              <div
                className="card record-card"
                key={index}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <p className="normal-card-text">
                    <strong className="card-title">Start Date:</strong>{" "}
                    <span className="each-year-record-text">{record.start_date}</span>
                  </p>
                  <p className="normal-card-text">
                    <strong className="card-title">End Date:</strong>{" "}
                    <span className="each-year-record-text">{record.end_date}</span>
                  </p>
                  <p className="normal-card-text">
                    <strong className="card-title">Highest Total Days:</strong>{" "}
                    <span
                      className={
                        record.total_highest_travel_day_per_year > 180
                          ? "each-year-warning-text"
                          : "each-year-safe-text"
                      }
                    >
                      {record.total_highest_travel_day_per_year}
                    </span>
                  </p>
                </div>

                <button
                  style={{ marginLeft: "auto", padding: "6px 12px", cursor: "pointer" }}
                  onClick={() => handleCalculateBtn(record.each_year_data_id)}
                  disabled={loading}
                >
                  {loading ? "Calculating..." : "Calculate"}
                </button>
              </div>
            ))}
          </div>

          <div className="card message-card">
            <h3 className="message-title">Message</h3>
            <p className={data.break_the_rule_message.includes("safe") ? "safe-text" : "warning-text"}>
              {data.break_the_rule_message}
            </p>
          </div>

        </div>
      ) : (
        <p className="loading-text">No data available.</p>
      )}
    </div>
  );
};

export default Home;
