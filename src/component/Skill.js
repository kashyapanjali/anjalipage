import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetchPortfolio } from "../api";
import Loader from "./Loader";
import "./Skill.css";

const socket = io("https://anjalipagebackend.onrender.com");

function Skill() {
  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    database: [],
    tools: [],
    others: [""],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryDisplayNames = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools & Technologies",
    others: "Languages",
  };

  useEffect(() => {
    let isMounted = true;

    const getPortfolioData = async () => {
      try {
        const data = await fetchPortfolio();
        if (!isMounted) return;
        if (data?.skills) {
          setSkills(data.skills);
          setError("");
        } else if (!data) {
          setError("Unable to load skills right now. Refresh in a moment.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getPortfolioData();

    const handleRealtimeUpdate = (data) => {
      if (data.skills) {
        setSkills(data.skills);
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
      <div className="skills">
        <Loader message="Loading skills..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="skills">
        <Loader variant="error" message={error} />
      </div>
    );
  }

  return (
    <div className="skills">
      <div className="skills-hero">
        <div>
          <p className="section-tag">Capabilities</p>
          <h1 className="skills-title">Tech Stack</h1>
          <p className="skills-subtitle">
            A balanced mix of frontend craft, backend architecture, data engines,
            and the tools that keep delivery fast and reliable.
          </p>
        </div>
      </div>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, skillList]) => (
          <div className="skill-card" key={category}>
            <div className="skill-card-head">
              <span className="skill-badge">
                {String(categoryDisplayNames[category] || category).slice(0, 2)}
              </span>
              <h2>
                {categoryDisplayNames[category] ||
                  category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
            </div>
            {skillList?.length ? (
              <ul>
                {skillList.map((skill, index) => (
                  <li key={index} className="skill-pill">
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No skills added yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skill;
