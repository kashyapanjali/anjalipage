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
    tools: [],  //add here tools&Technology
    others:[""]
  });

  const categoryDisplayNames = {
    frontend: "Frontend ",
    backend: "Backend ",
    database: "Database",
    tools: "Tools & Technologies", // Updated category name
    others:"Language"
  };
  useEffect(() => {
    // Fetch portfolio data on mount
    const getPortfolioData = async () => {
      const data = await fetchPortfolio();
      if (data?.skills) setSkills(data.skills);
    };

    getPortfolioData();

    // Listen for real-time updates
    socket.on("portfolioUpdated", (data) => {
      if (data.skills) setSkills(data.skills);
    });

    return () => socket.off("portfolioUpdated");
  }, []);

  return (
    <div className="skills">
      <h1 className="skills-title">My Skills</h1>
      <div className="skills-container">
        {Object.entries(skills).map(([category, skillList]) => (
          <div className="skills-category" key={category}>
            <h2>{categoryDisplayNames[category] || category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <ul>
              {skillList.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skill;
