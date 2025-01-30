import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Skill.css";

const socket = io("http://localhost:5000");

function Skill() {
  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    database: [],
    tools: []
  });

  useEffect(() => {
    // Listen for real-time updates
    socket.on("updatePortfolio", (data) => {
      if (data.skills) setSkills(data.skills);
    });

    return () => socket.off("updatePortfolio");
  }, []);

  return (
    <div className="skills">
      <h1 className="skills-title">My Skills</h1>
      <div className="skills-container">
        {Object.entries(skills).map(([category, skillList]) => (
          <div className="skills-category" key={category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Development</h2>
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
