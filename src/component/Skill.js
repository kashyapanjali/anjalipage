import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetchPortfolio } from "../api";
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

  const categoryDisplayNames = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools & Technologies",
    others: "Languages",
  };

  useEffect(() => {
    const getPortfolioData = async () => {
      const data = await fetchPortfolio();
      if (data?.skills) setSkills(data.skills);
    };

    getPortfolioData();

    socket.on("portfolioUpdated", (data) => {
      if (data.skills) setSkills(data.skills);
    });

    return () => socket.off("portfolioUpdated");
  }, []);

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
