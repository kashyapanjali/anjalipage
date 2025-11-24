import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "./Admin.css";

const socket = io("https://anjalipagebackend.onrender.com");

const Admin = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    database: [],
    tools: [],
    others:[]
  });
  const [certificates, setCertificates] = useState({
    Internship: [],
    Course: [],
    Completion: [],
  });
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("");
  const [selectedCertCategory, setSelectedCertCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newCertLink, setNewCertLink] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "https://anjalipagebackend.onrender.com/api/users";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Redirecting to login.");
          navigate("/login");
          return;
        }
  
        console.log("Token from localStorage:", token);
  
        const response = await axios.get(`${API_BASE_URL}/admin-dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Admin Data Fetched:", response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error.response?.data?.message || error.message);
      }
    };
  
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchData(); // Now it's inside useEffect, no dependency issue
      } else {
        navigate("/login");
      }
    });
  
    return () => unsubscribe();
  }, [navigate]); // Only `navigate` is a dependency
  

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const token = await user.getIdToken(); // Fetch token from Firebase auth
  
      const formData = new FormData();
      formData.append("profilePic", file);
  
      const response = await axios.put(`${API_BASE_URL}/admin/profile-pic`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
          "Content-Type": "multipart/form-data",
        },
      });
  
      setProfilePic(response.data.profilePic);
      setMessage("Profile picture updated successfully!");
      socket.emit("portfolioUpdated", { profilePic: response.data.profilePic, skills, certificates });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setMessage("Failed to update profile picture.");
    }
  };
  
  const handleAddSkill = async () => {
    if (!selectedSkillCategory || newSkill.trim() === "") {
      setMessage("Please select a category and enter a skill.");
      return;
    }
  
    try {
      const token = await user.getIdToken(); // Fetch token from Firebase auth
  
      const skillsArray = newSkill.split(",").map((skill) => skill.trim());
  
      await axios.post(`${API_BASE_URL}/admin/skills`, {
        category: selectedSkillCategory,
        skills: skillsArray,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      });
  
      const updatedSkills = { ...skills, [selectedSkillCategory]: [...skills[selectedSkillCategory], ...skillsArray] };
      setSkills(updatedSkills);
      setMessage("Skills added successfully!");
      socket.emit("portfolioUpdated", { skills: updatedSkills, certificates });
      setNewSkill("");
      setSelectedSkillCategory("");
      setShowSkillForm(false);
    } catch (error) {
      console.error("Error adding skill:", error);
      setMessage("Error adding skill. Please try again.");
    }
  };
  
  const handleAddCertificate = async () => {
    if (!selectedCertCategory || !newCertLink.trim()) {
      setMessage("Please select a category and enter a certificate link.");
      return;
    }
  
    try {
      const token = await user.getIdToken(); // Fetch token from Firebase auth
  
      await axios.post(`${API_BASE_URL}/admin/certificates`, {
        category: selectedCertCategory,
        link: newCertLink,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      });
  
      const updatedCertificates = { ...certificates };
      updatedCertificates[selectedCertCategory].push(newCertLink);
      setCertificates(updatedCertificates);
      setMessage("Certificate added successfully!");
      socket.emit("portfolioUpdated", { skills, certificates: updatedCertificates });
      setNewCertLink("");
      setSelectedCertCategory("");
      setShowCertForm(false);
    } catch (error) {
      console.error("Error adding certificate:", error);
      setMessage("Error adding certificate. Please try again.");
    }
  };
  
  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="admin">
      <div className="admin-card">
        <header className="admin-header">
          <div>
            <p className="section-tag">Dashboard</p>
            <h2>Portfolio Control Room</h2>
            <p className="subtext">
              Update skills, certificates, and your public avatar. Every change
              is pushed in real time to the public site.
            </p>
          </div>
          <div className="header-actions">
            {user && <span className="welcome-chip">{user.email}</span>}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </header>

        <div className="admin-content">
          {/* Profile Picture Section */}
          <section className="admin-section">
            <div className="section-head">
              <div>
                <p className="section-tag">Profile</p>
                <h3>Profile Picture</h3>
              </div>
            </div>
            <div className="profile-card">
              <img
                src={profilePic || "/default-profile.png"}
                alt="Profile"
                className="profile-pic"
              />
              <label className="upload-label">
                <span>Upload new avatar</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                />
              </label>
            </div>
          </section>

          {/* Skills Section */}
          <section className="admin-section">
            <div className="section-head">
              <div>
                <p className="section-tag">Skills</p>
                <h3>Skills Management</h3>
              </div>
              <button
                className="add-button"
                onClick={() => setShowSkillForm(true)}
              >
                + Add Skill
              </button>
            </div>
            <div className="skills-container">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="skills-category">
                  <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                  {skillList.length ? (
                    <ul>
                      {skillList.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-state">No skills yet</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certificates Section */}
          <section className="admin-section">
            <div className="section-head">
              <div>
                <p className="section-tag">Certificates</p>
                <h3>Certificates Management</h3>
              </div>
              <button
                className="add-button"
                onClick={() => setShowCertForm(true)}
              >
                + Add Certificate
              </button>
            </div>
            <div className="certificates-container">
              {Object.entries(certificates).map(([category, certList]) => (
                <div key={category} className="certificate-category">
                  <h4>{category}</h4>
                  {certList.length ? (
                    <ul>
                      {certList.map((link, index) => (
                        <li key={index}>
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            Certificate {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-state">No certificates yet</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
        {message && <p className="message">{message}</p>}
      </div>

      {showSkillForm && (
        <div className="form-modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-head">
              <h3>Add Skills</h3>
              <button
                className="close-button"
                onClick={() => setShowSkillForm(false)}
                aria-label="Close skill form"
              >
                ×
              </button>
            </div>
            <label className="field">
              <span>Category</span>
              <select
                value={selectedSkillCategory}
                onChange={(e) => setSelectedSkillCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="tools">Tools</option>
                <option value="others">Others</option>
              </select>
            </label>
            <label className="field">
              <span>Skills</span>
              <input
                type="text"
                placeholder="Enter skills separated by commas"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <small>Example: React, Node, MongoDB</small>
            </label>
            <div className="form-buttons">
              <button onClick={handleAddSkill} className="save-button">
                Save
              </button>
              <button
                onClick={() => setShowSkillForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCertForm && (
        <div className="form-modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-head">
              <h3>Add Certificate</h3>
              <button
                className="close-button"
                onClick={() => setShowCertForm(false)}
                aria-label="Close certificate form"
              >
                ×
              </button>
            </div>
            <label className="field">
              <span>Category</span>
              <select
                value={selectedCertCategory}
                onChange={(e) => setSelectedCertCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Internship">Internship</option>
                <option value="Course">Course</option>
                <option value="Completion">Completion</option>
              </select>
            </label>
            <label className="field">
              <span>Certificate URL</span>
              <input
                type="url"
                placeholder="https://example.com/certificate"
                value={newCertLink}
                onChange={(e) => setNewCertLink(e.target.value)}
              />
            </label>
            <div className="form-buttons">
              <button onClick={handleAddCertificate} className="save-button">
                Save
              </button>
              <button
                onClick={() => setShowCertForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
