import React, { useState } from "react";
import axios from "axios";
import "./Skill.css";

function Skill() {
    const [skills, setSkills] = useState({
        frontend: ["HTML", "CSS", "JavaScript", "React.js", "Redux"],
        backend: ["Node.js", "Express.js", "REST APIs", "WebSocket"],
        database: ["MySQL", "PostgreSQL", "MongoDB"],
        tools: ["Git & GitHub", "Postman", "Chrome DevTools", "Leaflet"]
    });

    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newSkills, setNewSkills] = useState("");
    const [message, setMessage] = useState("");

    // Handle adding new skills
    const handleAddSkill = async () => {
        if (!selectedCategory || newSkills.trim() === "") {
            setMessage("Please select a category and enter skills");
            return;
        }

        try {
            // Convert comma-separated skills to array
            const skillsArray = newSkills.split(',').map(skill => skill.trim());

            const response = await axios.post(
                'http://localhost:5000/api/users/admin/skills',
                {
                    category: selectedCategory,
                    skills: skillsArray
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'admin-key': 'anjalikashyap9608'
                    }
                }
            );

            // Update local state with new skills
            setSkills(prevSkills => ({
                ...prevSkills,
                [selectedCategory]: [...prevSkills[selectedCategory], ...skillsArray]
            }));

            setMessage("Skills added successfully!");
            setNewSkills("");
            setSelectedCategory("");
            setShowForm(false);
        } catch (error) {
            console.error('Error adding skills:', error);
            setMessage('Error adding skills. Please try again.');
        }
    };

    return (
        <div className="skills">
            <h1 className="skills-title">My Skills</h1>

            {/* Skills categories */}
            <div className="skills-container">
                {Object.entries(skills).map(([category, skillList]) => (
                    <div className="skills-category" key={category}>
                        <h2>
                            {category.charAt(0).toUpperCase() + category.slice(1)} Development
                        </h2>
                        <ul>
                            {skillList.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Add Skill Button */}
            <button className="add-skill-button" onClick={() => setShowForm(true)}>
                +
            </button>

            {/* Add Skill Form */}
            {showForm && (
                <div className="add-skill-form">
                    <select
                        className="dropdown"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
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
                        value={newSkills}
                        onChange={(e) => setNewSkills(e.target.value)}
                    />

                    <div className="form-buttons">
                        <button onClick={handleAddSkill} className="save-button">
                            Add Skills
                        </button>
                        <button onClick={() => setShowForm(false)} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Message display */}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default Skill;