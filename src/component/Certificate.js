import React, { useEffect, useState } from "react";
import { fetchPortfolio } from "../api"; // API call function
import { io } from "socket.io-client";
import Loader from "./Loader";
import "./Certificate.css";

const socket = io("https://anjalipagebackend.onrender.com");

function Certificate() {
  const [certificates, setCertificates] = useState({
    Internship: [],
    Course: [],
    Completion: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryDisplayNames = {
    Internship: "Intern Certificates",
    Course: "Course & Interest Certificates",
    Completion: "Other Certificates",
  };

  useEffect(() => {
    let isMounted = true;

    const normaliseCertificates = (payload) => ({
      Internship: payload?.certificates?.Internship || [],
      Course: payload?.certificates?.Course || [],
      Completion: payload?.certificates?.Completion || [],
    });

    const getPortfolioData = async () => {
      try {
        const data = await fetchPortfolio();
        if (!isMounted) return;
        if (data?.certificates) {
          setCertificates(normaliseCertificates(data));
          setError("");
        } else if (!data) {
          setError("Certificates are taking longer than usual to load.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getPortfolioData();

    const handleRealtimeUpdate = (data) => {
      if (data?.certificates) {
        setCertificates(normaliseCertificates(data));
        setError("");
      }
    };

    socket.on("portfolioUpdated", handleRealtimeUpdate);

    return () => {
      isMounted = false;
      socket.off("portfolioUpdated", handleRealtimeUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="certificate-page">
        <Loader message="Loading certificates..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="certificate-page">
        <Loader variant="error" message={error} />
      </div>
    );
  }

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
