/** @format */
import React from "react";
import "./Skill.css";

function Skill() {
	return (
		<div className="skills">
			<h1 className="skills-title">My Skills</h1>
			<div className="skills-container">
				<div className="skills-category">
					<h2>Frontend Development</h2>
					<ul>
						<li>HTML</li>
						<li>CSS</li>
						<li>JavaScript</li>
						<li>React.js</li>
						<li>Redux</li>
					</ul>
				</div>
				<div className="skills-category">
					<h2>Backend Development</h2>
					<ul>
						<li>Node.js</li>
						<li>Express.js</li>
						<li>REST APIs</li>
						<li>WebSocket</li>
					</ul>
				</div>
				<div className="skills-category">
					<h2>Database Management</h2>
					<ul>
						<li>MySQL</li>
						<li>PostgreSQL</li>
						<li>MongoDB</li>
					</ul>
				</div>
				<div className="skills-category">
					<h2>Other Tools</h2>
					<ul>
						<li>Git & GitHub</li>
						<li>Postman</li>
						<li>WebSocket</li>
						<li>Chrome DevTools</li>
						<li>Leaflet</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Skill;
