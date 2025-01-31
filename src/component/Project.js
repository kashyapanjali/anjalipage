/** @format */

import React from "react";
import "./Project.css";

function Project() {
	const projects = [
		{
			title:"LocationAccess App (2024)",
            link:"https://locationwithtoken.netlify.app/",
			description:"A React-based web app allowing users to share real-time location embeded in tokens with full of Security. Features include WebSocket updates, React frontend, Express Node.Js for backend ,storing the data of authentication use MYSQL."
		},
		{
			title: "Docify (2024)",
			link: "https://github.com/PratyushPoddar07/nutrinerds",
			description:
				"An innovative platform built during the IIT Dhanbad ISM Hackathon. Docify streamlines the Virtual AI-powered Medical Assistant ChatBot and Food Detection Consultancy through capturing photos, incorporating real-world problem-solving. Developed using Python for backend and Streamlit for frontend.",
		},
		{
			title: "WeatherApp (2023)",
			link: "https://anjali-weather-app.netlify.app/",
			description:
				"A project designed to provide users with real-time weather updates and forecasts based on their location. Built with HTML, CSS, and JavaScript, the app integrates OpenWeatherMap's API to fetch accurate weather data. Features include location-based forecast and collecting user feedback.",
		},
	];

	return (
		<div className="work">
			<h1 className="work-title">Work Project</h1>
			<div className="work-container">
				{projects.map((project, index) => (
					<div className="work-item" key={index}>
						<h2>{project.title}</h2>
						<a href={project.link} target="_blank" rel="noopener noreferrer">
							Link
						</a>
						<p>{project.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Project;
