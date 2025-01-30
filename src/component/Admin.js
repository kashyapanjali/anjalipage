/** @format */
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000"); // Connect to backend

const Admin = () => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    database: [],
    tools: []
  });
  const [certificates, setCertificates] = useState({
    Internship: [],
    Course: [],
    Completion: []
  });
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("");
  const [selectedCertCategory, setSelectedCertCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newCertLink, setNewCertLink] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/users';

  // User Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === process.env.REACT_APP_ADMIN_EMAIL) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Add skill to database
  const handleAddSkill = async () => {
    if (!selectedSkillCategory || newSkill.trim() === "") {
      setMessage("Please select a category and enter a skill.");
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const skillsArray = newSkill.split(",").map(skill => skill.trim());

      // Send data to the backend
      await axios.post(`${API_BASE_URL}/admin/skills`, {
        category: selectedSkillCategory,
        skill: skillsArray
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
          'admin-key': process.env.REACT_APP_ADMIN_KEY
        }
      });

      // Emit updated skills data to all connected users
      const updatedSkills = { ...skills, [selectedSkillCategory]: [...skills[selectedSkillCategory], ...skillsArray] };
      socket.emit("newData", { skills: updatedSkills, certificates });

      setSkills(updatedSkills);
      setMessage("Skills added successfully!");
      setNewSkill("");
      setSelectedSkillCategory("");
      setShowSkillForm(false);
    } catch (error) {
      console.error('Error adding skill:', error);
      setMessage('Error adding skill. Please try again.');
    }
  };

  // Add certificate to database
  const handleAddCertificate = async () => {
    if (!selectedCertCategory || !newCertLink.trim()) {
      setMessage("Please select a category and enter a certificate link.");
      return;
    }

    try {
      const idToken = await user.getIdToken();

      // Send data to the backend
      await axios.post(`${API_BASE_URL}/admin/certificates`, {
        category: selectedCertCategory,
        link: newCertLink
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
          'admin-key': process.env.REACT_APP_ADMIN_KEY
        }
      });

      // Emit updated certificates data to all connected users
      const updatedCertificates = { ...certificates };
      updatedCertificates[selectedCertCategory].push(newCertLink);
      socket.emit("newData", { skills, certificates: updatedCertificates });

      setCertificates(updatedCertificates);
      setMessage("Certificate added successfully!");
      setNewCertLink("");
      setSelectedCertCategory("");
      setShowCertForm(false);
    } catch (error) {
      console.error('Error adding certificate:', error);
      setMessage('Error adding certificate. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="admin">
      <h2>Admin Panel</h2>
      {user && <p>Welcome, {user.email}!</p>}
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <div className="admin-content">
        {/* Skills Section */}
        <div className="admin-section">
          <h3>Skills Management</h3>
          <div className="skills-container">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="skills-category">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <ul>
                  {skillList.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button className="add-button" onClick={() => setShowSkillForm(true)}>
            +
          </button>

          {showSkillForm && (
            <div className="add-form">
              <select
                value={selectedSkillCategory}
                onChange={(e) => setSelectedSkillCategory(e.target.value)}
                className="dropdown"
              >
                <option value="">Select Category</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="tools">Tools</option>
              </select>

              <input
                type="text"
                placeholder="Enter skills (comma-separated)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />

              <div className="form-buttons">
                <button onClick={handleAddSkill} className="save-button">
                  Add Skill
                </button>
                <button onClick={() => setShowSkillForm(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Certificates Section */}
        <div className="admin-section">
          <h3>Certificates Management</h3>
          <div className="certificates-container">
            {Object.entries(certificates).map(([category, certList]) => (
              <div key={category} className="certificate-category">
                <h4>{category}</h4>
                <ul>
                  {certList.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        Certificate {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button className="add-button" onClick={() => setShowCertForm(true)}>
            +
          </button>

          {showCertForm && (
            <div className="add-form">
              <select
                value={selectedCertCategory}
                onChange={(e) => setSelectedCertCategory(e.target.value)}
                className="dropdown"
              >
                <option value="">Select Category</option>
                <option value="Internship">Internship</option>
                <option value="Course">Course</option>
                <option value="Completion">Completion</option>
              </select>

              <input
                type="text"
                placeholder="Enter certificate link"
                value={newCertLink}
                onChange={(e) => setNewCertLink(e.target.value)}
              />

              <div className="form-buttons">
                <button onClick={handleAddCertificate} className="save-button">
                  Add Certificate
                </button>
                <button onClick={() => setShowCertForm(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Admin;
