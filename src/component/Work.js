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
					<a href="https://github.com/kashyapanjali/anjalipage" target="_blank" rel="noopener noreferrer">
						Link
					</a>
					<p>I am working on my portfolio with MongoDB, React.js, Express.js...</p>
				</div>

				<div className="work-item">
					<h2>Location Access App</h2>
					<a href="https://locationwithtoken.netlify.app/" target="_blank" rel="noopener noreferrer">
						Link
					</a>
					<p>A React-based web app allowing users to share real-time location through access tokens. Features include WebSocket updates, React frontend, and secure authentication.</p>
				</div>
			</div>
		</div>
	);
}

export default Work;
