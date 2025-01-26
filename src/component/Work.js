/** @format */
import React, { useState } from "react";
import "./Work.css";

function Work() {
	const [showOptions, setShowOptions] = useState(false);
	const [activeOption, setActiveOption] = useState(null);
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [projectLink, setProjectLink] = useState("");
	const [isAdding, setIsAdding] = useState(false);
	const [workItems, setWorkItems] = useState([
		{
			category: "Continue with",
			name: "Portfolio Project",
			link: "http://kashyapanjali/github.com",
			description: "I am working on my portfolio with MongoDB, React.js, Express.js...",
		},
		{
			category: "Completed Project",
			name: "Location Access App",
			link: "https://locationwithtoken.netlify.app/",
			description:
				"A React-based web app allowing users to share real-time location through access tokens. Features include WebSocket updates, React frontend, and secure authentication.",
		},
	]);

	// Handles adding a new work item
	const handleAddWork = () => {
		if (!projectName || !projectDescription || !projectLink) {
			alert("Please fill in all fields.");
			return;
		}

		const newWorkItem = {
			category: activeOption,
			name: projectName,
			link: projectLink,
			description: projectDescription,
		};

		setWorkItems([...workItems, newWorkItem]);
		setActiveOption(null);
		setShowOptions(false);
		setIsAdding(false);
		setProjectName("");
		setProjectDescription("");
		setProjectLink("");
	};

	// Handles cancel button click
	const handleCancel = () => {
		setActiveOption(null);
		setShowOptions(false);
		setIsAdding(false);
		setProjectName("");
		setProjectDescription("");
		setProjectLink("");
	};

	return (
		<div className="work">
			<h1 className="work-title">Recent Work Project</h1>
			<div className="work-container">
				{/* Render existing work items */}
				{workItems.map((item, index) => (
					<div className="work-item" key={index}>
						<h2>
							{/* Show only the project name if it's a completed project */}
							{item.category === "Completed Project" ? item.name : item.category}
						</h2>
						{item.link && (
							<a href={item.link} target="_blank" rel="noopener noreferrer">
								Link
							</a>
						)}
						<p>{item.description}</p>
					</div>
				))}
			</div>

			{/* Add Button */}
			<button className="add-button" onClick={() => setShowOptions(!showOptions)}>
				+
			</button>

			{/* Show options when the add button is clicked */}
			{showOptions && (
				<div className="options">
					<button
						onClick={() => setActiveOption("Continue Project")}
						className={`option-button ${
							activeOption === "Continue Project" ? "active" : ""
						}`}
					>
						Continue Project
					</button>
					<button
						onClick={() => setActiveOption("Completed Project")}
						className={`option-button ${
							activeOption === "Completed Project" ? "active" : ""
						}`}
					>
						Completed Project
					</button>
				</div>
			)}

			{/* Show form when an option is selected */}
			{activeOption && (
				<div className="project-form">
					<h3>{activeOption}</h3>
					<input
						type="text"
						placeholder="Project Name"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Project Link"
						value={projectLink}
						onChange={(e) => setProjectLink(e.target.value)}
					/>
					<textarea
						placeholder="Project Description"
						value={projectDescription}
						onChange={(e) => setProjectDescription(e.target.value)}
					></textarea>
					<button onClick={handleAddWork} className="save-button">
						Add Work
					</button>
					<button onClick={handleCancel} className="cancel-button">
						Cancel
					</button>
				</div>
			)}
		</div>
	);
}

export default Work;
