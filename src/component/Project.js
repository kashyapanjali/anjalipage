/** @format */

import React, { useState } from "react";
import "./Project.css";

function Project() {
	const [projects, setProjects] = useState([
		{
			title: "Docify (2024)",
			link: "https://github.com/PratyushPoddar07/nutrinerds",
			description:
				"An innovative platform built during the IIT Dhanbad ISM Hackathon. Docify streamlines the Virtual AI-powered Medical Assistant ChatBot and Food Detection Consultancy through capturing photos, incorporating real-world problem-solving. Developed using Python for backend and Streamlit for frontend.",
		},
		{
			title: "WeatherApp (2023)",
			link: "https://anjali-weather-app.netlify.app/",
			description:
				"A project designed to provide users with real-time weather updates and forecasts based on their location. Built with HTML, CSS, and JavaScript, the app integrates OpenWeatherMap's API to fetch accurate weather data. Features include location-based forecast and collecting user feedback.",
		},
	]);

	const [newTitle, setNewTitle] = useState("");
	const [newLink, setNewLink] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	const handleAddProject = () => {
		if (!newTitle || !newDescription) {
			alert("Please fill in all required fields.");
			return;
		}

		const newProject = {
			title: newTitle,
			link: newLink || "#", // Default link if none is provided
			description: newDescription,
		};

		setProjects([...projects, newProject]);
		setNewTitle("");
		setNewLink("");
		setNewDescription("");
		setIsAdding(false);
	};

	return (
		<div className="work">
			<h1 className="work-title">Work Project</h1>
			<div className="work-container">
				{projects.map((project, index) => (
					<div className="work-item" key={index}>
						<h2>{project.title}</h2>
						<a href={project.link} target="_blank" rel="noopener noreferrer">
							Link
						</a>
						<p>{project.description}</p>
					</div>
				))}
			</div>

			{/* Add Project Button */}
			<button className="add-button" onClick={() => setIsAdding(true)}>
				+
			</button>

			{/* Form for Adding New Projects */}
			{isAdding && (
				<div className="project-form">
					<input
						type="text"
						placeholder="Project Title"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Project Link (optional)"
						value={newLink}
						onChange={(e) => setNewLink(e.target.value)}
					/>
					<textarea
						placeholder="Project Description"
						value={newDescription}
						onChange={(e) => setNewDescription(e.target.value)}
					></textarea>
					<div className="form-buttons">
						<button onClick={handleAddProject} className="save-button">
							Save Project
						</button>
						<button onClick={() => setIsAdding(false)} className="cancel-button">
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Project;
