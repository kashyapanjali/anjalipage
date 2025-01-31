import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "./Admin.css";

const socket = io("http://localhost:5000");

const Admin = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    database: [],
    tools: [],
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

  const API_BASE_URL = "http://localhost:5000/api/users";

  const fetchData = async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }
  
      console.log("Token from localStorage:", token); // Log the token
  
      // Send Token in Request Headers
      const response = await axios.get("http://localhost:5000/api/users/admin-dashboard", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
      });
  
      console.log("Admin Data Fetched:", response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error.response?.data?.message || error.message);
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchData(); // Fetch data after login
      } else {
        navigate("/login");
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);
  

  // Handle Profile Picture Upload
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const response = await axios.put(`${API_BASE_URL}/admin/profile-pic`, formData, {
        headers: {
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

  // Add Skill to Database
  const handleAddSkill = async () => {
    if (!selectedSkillCategory || newSkill.trim() === "") {
      setMessage("Please select a category and enter a skill.");
      return;
    }

    try {
      const skillsArray = newSkill.split(",").map((skill) => skill.trim());

      await axios.post(`${API_BASE_URL}/admin/skills`, {
        category: selectedSkillCategory,
        skills: skillsArray,
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

  // Add Certificate to Database
  const handleAddCertificate = async () => {
    if (!selectedCertCategory || !newCertLink.trim()) {
      setMessage("Please select a category and enter a certificate link.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/admin/certificates`, {
        category: selectedCertCategory,
        link: newCertLink,
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
      <h2>Admin Panel</h2>
      {user && <p>Welcome, {user.email}!</p>}
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <div className="admin-content">
        {/* Profile Picture Section */}
        <div className="admin-section">
          <h3>Profile Picture</h3>
          <img src={profilePic || "/default-profile.png"} alt="Profile" className="profile-pic" />
          <input type="file" accept="image/*" onChange={handleProfilePicUpload} />
        </div>

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
          <button className="add-button" onClick={() => setShowSkillForm(true)}>+</button>
          {showSkillForm && (
            <div className="add-form">
              <select value={selectedSkillCategory} onChange={(e) => setSelectedSkillCategory(e.target.value)} className="dropdown">
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
                <button onClick={handleAddSkill} className="save-button">Add Skill</button>
                <button onClick={() => setShowSkillForm(false)} className="cancel-button">Cancel</button>
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

          <button className="add-button" onClick={() => setShowCertForm(true)}>+</button>

          {showCertForm && (
            <div className="add-form">
              <select value={selectedCertCategory} onChange={(e) => setSelectedCertCategory(e.target.value)} className="dropdown">
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
                <button onClick={handleAddCertificate} className="save-button">Add Certificate</button>
                <button onClick={() => setShowCertForm(false)} className="cancel-button">Cancel</button>
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
