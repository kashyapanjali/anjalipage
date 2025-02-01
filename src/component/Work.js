/** @format */
import React from "react";
import "./Work.css";

function Work() {
	return (
		<div className="work">
			<h1 className="work-title">Recent Work Project</h1>
			<div className="work-container">
				<div className="work-item">
					<h2>Continue with - My portfolio</h2>
					<a href="https://github.com/kashyapanjali/anjalipage" target="_blank" rel="noopener noreferrer">
						Link
					</a>
					<p>I'm building my portfolio using HTML,CSS,JavaScript, MongoDB, React.js, Express.js, and Node.js, leveraging WebSocket technology to enable real-time updates on the portfolio page, seamlessly managed by the Admin.</p>				</div>
			</div>
		</div>
	);
}

export default Work;
