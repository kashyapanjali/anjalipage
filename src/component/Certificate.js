import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Certificate.css";

const socket = io("http://localhost:5000");

function Certificate() {
  const [certificates, setCertificates] = useState({
    Internship: [],
    Course: [],
    Completion: []
  });

  const categoryDisplayNames = {
    Internship: "Intern Certificates",
    Course: "Course Certificates",
    Completion: "Completion Certificates"
  };

  useEffect(() => {
    // Listen for real-time updates
    socket.on("updatePortfolio", (data) => {
      if (data.certificates) setCertificates(data.certificates);
    });

    return () => socket.off("updatePortfolio");
  }, []);

  return (
    <div className="certificate">
      <h1 className="certificate-title">My Certificates</h1>
      <div className="certificate-container">
        {Object.keys(certificates).map((category) => (
          <div className="certificate-category" key={category}>
            <h2>{categoryDisplayNames[category]}</h2>
            <ul>
              {certificates[category].map((link, index) => (
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
