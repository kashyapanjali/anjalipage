/** @format */

import React, { useState } from "react";
import "./Home.css";

function Home() {
	const [imageFile, setImageFile] = useState(null);

	// funtion to handlle image selection
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(URL.createObjectURL(file));
		}
	};

	const handleCircleClick = () => {
		document.getElementById("imageInput").click(); // Programmatically trigger file input
	};

	return (
		<div className="home">
			{/* Navigation Bar */}
			<div className="navbar">
				<div>
					<a href="/">Home</a>
				</div>
				<div>
					<a href="/about">About</a>
				</div>
				<div>
					<a href="/work">Recent Work</a>
				</div>
				<div>
					<a href="/skills">Skills</a>
				</div>
				<div>
					<a href="/project">Projects</a>
				</div>
				<div>
					<a href="/blog">Certificate</a>
				</div>
				<div>
					<a href="/contact">Get In Touch</a>
				</div>
			</div>

			{/* Hero Section */}
			<div className="hero">
				<div className="hero-text">
					<h1>Anjali Kashyap</h1>
					<p>
						Hi, I’m <strong>Anjali Kashyap</strong>, a passionate{" "}
						<strong>Full Stack Developer</strong> dedicated to crafting
						impactful digital experiences. I thrive on transforming ideas into
						reality with creativity, innovation, and precision.
					</p>

					<button className="cta-button">Let’s get started &gt;</button>
				</div>
				<div className="hero-image" onClick={handleCircleClick}>
					<img
						src={imageFile || "https://via.placeholder.com/200"}
						alt="Profile"
						className="profile-photo"
					/>
					<input
						id="imageInput"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						style={{ display: "none" }} // Hide the input element
					/>
				</div>
			</div>

			{/* Company Logos */}
			<div className="company-logos">
				<div className="contactWith">Touch With:</div>
				<div className="logo">
					<a
						href="https://www.linkedin.com/in/anjalikashyap97/"
						target="_blank"
						rel="noopener noreferrer">
						<i className="fab fa-linkedin"></i>
					</a>
				</div>
				<div className="logo">
					<a
						href="https://www.instagram.com/anjali_kashyap997/"
						target="_blank"
						rel="noopener noreferrer">
						<i className="fab fa-instagram"></i>
					</a>
				</div>
				<div className="logo">
					<a
						href="https://x.com/anjali801421"
						target="_blank"
						rel="noopener noreferrer">
						<i className="fab fa-twitter"></i>
					</a>
				</div>
				<div className="logo">
					<a
						href="https://www.facebook.com/profile.php?id=61557864083972"
						target="_blank"
						rel="noopener noreferrer">
						<i className="fab fa-facebook"></i>
					</a>
				</div>
			</div>
		</div>
	);
}

export default Home;
