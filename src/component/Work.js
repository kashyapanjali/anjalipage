/** @format */
import React from "react";
import "./Work.css";

function Work() {
	return (
		<div className="work">
			<h1 className="work-title">Recent Work Project</h1>
			<div className="work-container">
				<div className="work-item">
					<h2>Continue with</h2>
					<p>
						I am working on my portfolio with mongoDB, react.js, react.js,
						express.js......
					</p>
				</div>
				<div className="work-item">
					<h2>LocationAccess(2024)</h2>
					<a href="https://locationwithtoken.netlify.app/">Link</a>
					<p>
						A React-based web application that allows users to share their
						real-time location with others through unique access tokens.
						Technologies include React.js for the frontend, Express.js and
						Node.js for the backend, and MySQL for storing user data and
						location updates. Features include token generation, WebSocket for
						real-time location updates, and secure authentication.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Work;
