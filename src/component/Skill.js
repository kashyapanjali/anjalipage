/** @format */
import React, { useState } from "react";
import "./Skill.css";

function Skill() {
	const [skills, setSkills] = useState({
		"Frontend Development": ["HTML", "CSS", "JavaScript", "React.js", "Redux"],
		"Backend Development": ["Node.js", "Express.js", "REST APIs", "WebSocket"],
		"Database Management": ["MySQL", "PostgreSQL", "MongoDB"],
		"Other Tools": ["Git & GitHub", "Postman","Chrome DevTools", "Leaflet"],
	});

	const [showForm, setShowForm] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [newSkill, setNewSkill] = useState("");

	// Handles adding a new skill to the selected category
	const handleAddSkill = () => {
		if (!selectedCategory || newSkill.trim() === "") {
			alert("Please select a category and enter a skill.");
			return;
		}

		setSkills((prevSkills) => ({
			...prevSkills,
			[selectedCategory]: [...prevSkills[selectedCategory], newSkill],
		}));

		setNewSkill("");
		setSelectedCategory("");
		setShowForm(false);
	};

	return (
		<div className="skills">
			<h1 className="skills-title">My Skills</h1>

			{/* Skills categories */}
			<div className="skills-container">
				{Object.keys(skills).map((category) => (
					<div className="skills-category" key={category}>
						<h2>{category}</h2>
						<ul>
							{skills[category].map((skill, index) => (
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
					{/* Select Category */}
					<select
					className="dropdown"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="">Select Category</option>
						{Object.keys(skills).map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>

					{/* Input New Skill */}
					<input
						type="text"
						placeholder="Enter new skill"
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
					/>

					{/* Form Buttons */}
					<div className="form-buttons">
						<button onClick={handleAddSkill} className="save-button">
							Add Skill
						</button>
						<button onClick={() => setShowForm(false)} className="cancel-button">
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Skill;
