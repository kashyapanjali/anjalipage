/** @format */
import React from "react";
import "./Certificate.css";

function Certificate() {
	return (
		<div className="certificate">
			<h1 className="certificate-title">My Certificates</h1>
			<div className="certificate-container">
				<div className="certificate-category">
					<h2>Intern Certificates</h2>
					<ul>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 1
							</a>
						</li>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 2
							</a>
						</li>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 3
							</a>
						</li>
					</ul>
				</div>
				<div className="certificate-category">
					<h2>Course Certificates</h2>
					<ul>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 1
							</a>
						</li>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 2
							</a>
						</li>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 3
							</a>
						</li>
					</ul>
				</div>
				<div className="certificate-category">
					<h2>Completion Certificates</h2>
					<ul>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 1
							</a>
						</li>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 2
							</a>
						</li>
						<li>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Certificate Link 3
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Certificate;
