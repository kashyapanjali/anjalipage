import React, { useEffect, useState } from "react";
import { fetchPortfolio } from "../api"; // API call function
import { io } from "socket.io-client";
import "./Certificate.css";

const socket = io("https://anjalipagebackend.onrender.com");

function Certificate() {
  const [certificates, setCertificates] = useState({
    Internship: [],
    Course: [],
    Completion: []
  });

  const categoryDisplayNames = {
    Internship: "Intern Certificates",
    Course: "Course&Interest Certificates",
    Completion: "Other Certificates"
  };

  useEffect(() => {
    // Fetch portfolio data on mount
    const getPortfolioData = async () => {
      const data = await fetchPortfolio();
      if (data?.certificates) {
        setCertificates({
          Internship: data.certificates.Internship || [],
          Course: data.certificates.Course || [],
          Completion: data.certificates.Completion || []
        });
      }
    };

    getPortfolioData();

    // Listen for real-time updates
    socket.on("portfolioUpdated", (data) => {
      console.log("WebSocket Update Received:", data);
      if (data?.certificates) {
        setCertificates({
          Internship: data.certificates.Internship || [],
          Course: data.certificates.Course || [],
          Completion: data.certificates.Completion || []
        });
      }
    });

    return () => socket.off("portfolioUpdated");
  }, []);

  return (
    <div className="certificate">
      <h1 className="certificate-title">My Certificates</h1>
      <div className="certificate-container">
        {Object.keys(certificates).map((category) => (
          <div className="certificate-category" key={category}>
            <h2>{categoryDisplayNames[category]}</h2>
            <ul>
              {certificates[category]?.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {`${categoryDisplayNames[category].slice(0, -12)} Certificate ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificate;
