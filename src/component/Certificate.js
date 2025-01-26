/** @format */
import React, { useState } from "react";
import "./Certificate.css";

function Certificate() {
	const [certificates, setCertificates] = useState({
		"Intern Certificates": [
			"Certificate Link 1",
			"Certificate Link 2",
			"Certificate Link 3",
		],
		"Course Certificates": [
			"Certificate Link 1",
			"Certificate Link 2",
			"Certificate Link 3",
		],
		"Completion Certificates": [
			"Certificate Link 1",
			"Certificate Link 2",
			"Certificate Link 3",
		],
	});

	const [showForm, setShowForm] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [newCertificate, setNewCertificate] = useState("");

	// Handles adding a new certificate link to the selected category
	const handleAddCertificate = () => {
		if (!selectedCategory || newCertificate.trim() === "") {
			alert("Please select a category and enter a certificate link.");
			return;
		}

		setCertificates((prevCertificates) => ({
			...prevCertificates,
			[selectedCategory]: [...prevCertificates[selectedCategory], newCertificate],
		}));

		setNewCertificate("");
		setSelectedCategory("");
		setShowForm(false);
	};

	return (
		<div className="certificate">
			<h1 className="certificate-title">My Certificates</h1>

			{/* Certificate Categories */}
			<div className="certificate-container">
				{Object.keys(certificates).map((category) => (
					<div className="certificate-category" key={category}>
						<h2>{category}</h2>
						<ul>
							{certificates[category].map((link, index) => (
								<li key={index}>
									<a
										href={link}
										target="_blank"
										rel="noopener noreferrer"
									>
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Add Certificate Button */}
			<button className="add-certificate-button" onClick={() => setShowForm(true)}>
				+
			</button>

			{/* Add Certificate Form */}
			{showForm && (
				<div className="add-certificate-form">
					{/* Select Category */}
					<select className="dropdown"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="">Select Category</option>
						{Object.keys(certificates).map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>

					{/* Input New Certificate */}
					<input
						type="text"
						placeholder="Enter certificate link"
						value={newCertificate}
						onChange={(e) => setNewCertificate(e.target.value)}
					/>

					{/* Form Buttons */}
					<div className="form-buttons">
						<button onClick={handleAddCertificate} className="save-button">
							Add Certificate
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

export default Certificate;
