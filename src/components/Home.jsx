import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { afterLoginApi } from "../api";
import { getAuthHeader } from "../utils/authUtils"; 
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.clear();
    navigate("/");
  };

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
        navigate("/")
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {data ? (
        <>
          <p><strong>Total Days Used:</strong> {data.total_day_have_used}</p>
          <p><strong>This Year Used:</strong> {data.this_year_have_used}</p>

          <h3>Yearly Usage Records:</h3>
          <ul>
            {data.each_year_have_used_record.map((record, index) => (
              <li key={index}>
                <p><strong>Start Date:</strong> {record.start_date}</p>
                <p><strong>End Date:</strong> {record.end_date}</p>
                <p><strong>Total Days:</strong> {record.total_each_day}</p>
              </li>
            ))}
          </ul>

          <p><strong>Message:</strong> {data.break_the_rule_message}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
