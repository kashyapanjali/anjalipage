import React, { useEffect, useState } from "react";
import { fetchPortfolio } from "../api"; // API call function
import { io } from "socket.io-client";
import "./Certificate.css";

const socket = io("https://anjalipagebackend.onrender.com");

function Certificate() {
  const [certificates, setCertificates] = useState({
    Internship: [],
    Course: [],
    Completion: [],
  });

  const categoryDisplayNames = {
    Internship: "Intern Certificates",
    Course: "Course & Interest Certificates",
    Completion: "Other Certificates",
  };

  useEffect(() => {
    const getPortfolioData = async () => {
      const data = await fetchPortfolio();
      if (data?.certificates) {
        setCertificates({
          Internship: data.certificates.Internship || [],
          Course: data.certificates.Course || [],
          Completion: data.certificates.Completion || [],
        });
      }
    };

    getPortfolioData();

    socket.on("portfolioUpdated", (data) => {
      if (data?.certificates) {
        setCertificates({
          Internship: data.certificates.Internship || [],
          Course: data.certificates.Course || [],
          Completion: data.certificates.Completion || [],
        });
      }
    });

    return () => socket.off("portfolioUpdated");
  }, []);

  return (
    <div className="certificate-page">
      <div className="certificate-hero">
        <p className="section-tag">Milestones</p>
        <h1 className="certificate-title">Verified Achievements</h1>
        <p className="certificate-subtitle">
          Highlights of internships, coursework, and completion credentials that
          validate hands-on learning and domain expertise.
        </p>
      </div>
      <div className="certificate-grid">
        {Object.keys(certificates).map((category) => (
          <div className="certificate-card" key={category}>
            <div className="certificate-card-head">
              <span className="certificate-badge">
                {category.charAt(0)}
              </span>
              <h2>{categoryDisplayNames[category]}</h2>
            </div>
            {certificates[category]?.length ? (
              <ul>
                {certificates[category].map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      View Credential {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No certificates uploaded.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificate;
