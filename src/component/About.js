/* @format */
import React from "react";
import "./About.css";

function About() {
	return (
		<div className="about">
			{/* <h1>Education</h1> */}
			<div className="about-container1">
				<h1>Pursuing</h1>
				<div className="education-item">
					<h2>Bachelor of Technology (B.Tech)</h2>
					<p>Driems University</p>
					<p>2022 - 2026</p>
				</div>
			</div>
			<div className="about-container2">
				<h1>Highest Degree</h1>
				<div className="education-item">
					<h2>Senior Secondary Education</h2>
					<p>Sushant Public School</p>
					<p>2019 - 2021</p>
				</div>
				<div className="education-item">
					<h2>Secondary Education</h2>
					<p>Sushant Public School</p>
					<p>2017 - 2019</p>
				</div>
			</div>
		</div>
	);
}

export default About;
