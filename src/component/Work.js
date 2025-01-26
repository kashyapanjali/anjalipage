/** @format */
import React, { useState } from "react";
import "./Work.css";

function Work() {
	const [showOptions, setShowOptions] = useState(false);
	const [activeOption, setActiveOption] = useState(null);
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [projectLink, setProjectLink] = useState("");
	const [editIndex, setEditIndex] = useState(null);
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

	// Handles adding or editing a work item
	const handleSaveWork = () => {
		if (!projectName || !projectDescription || !projectLink) {
			alert("Please fill in all fields.");
			return;
		}

		const newWorkItem = {
			category: activeOption.includes("Continue") ? "Continue with" : "Completed Project",
			name: projectName,
			link: projectLink,
			description: projectDescription,
		};

		if (editIndex !== null) {
			// Update the existing work item
			const updatedWorkItems = [...workItems];
			updatedWorkItems[editIndex] = newWorkItem;
			setWorkItems(updatedWorkItems);
		} else {
			// Add a new work item
			setWorkItems([...workItems, newWorkItem]);
		}

		resetForm();
	};

	// Handles cancel button click
	const handleCancel = () => {
		resetForm();
	};

	// Resets the form and state
	const resetForm = () => {
		setActiveOption(null);
		setShowOptions(false);
		setProjectName("");
		setProjectDescription("");
		setProjectLink("");
		setEditIndex(null);
	};

	// Handles editing an ongoing project
	const handleEdit = (index) => {
		const itemToEdit = workItems[index];
		setProjectName(itemToEdit.name);
		setProjectDescription(itemToEdit.description);
		setProjectLink(itemToEdit.link);
		setActiveOption("Edit Continue Project");
		setEditIndex(index);
		setShowOptions(false);
	};

	return (
		<div className="work">
			<h1 className="work-title">Recent Work Project</h1>
			<div className="work-container">
				{/* Render existing work items */}
				{workItems.map((item, index) => (
					<div className="work-item" key={index}>
						<h2>{item.category === "Completed Project" ? item.name : item.category}</h2>
						{item.link && (
							<a href={item.link} target="_blank" rel="noopener noreferrer">
								Link
							</a>
						)}
						<p>{item.description}</p>
						{/* Show edit button only for ongoing projects */}
						{item.category === "Continue with" && (
							<button className="edit-button" onClick={() => handleEdit(index)}>
								Edit
							</button>
						)}
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
					{/* Option to add a new ongoing project */}
					<button
						onClick={() => {
							setActiveOption("Add Continue Project");
						}}
						className={`option-button ${
							activeOption === "Add Continue Project" ? "active" : ""
						}`}
					>
						Add Continue Project
					</button>

					{/* Option for completed project */}
					<button
						onClick={() => {
							setActiveOption("Completed Project");
						}}
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
					<button onClick={handleSaveWork} className="save-button">
						{editIndex !== null ? "Save Changes" : "Add Work"}
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
