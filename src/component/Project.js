/** @format */

import React from "react";
import "./Project.css";

function Project() {
	const projects = [
		{
			title: "LocationAccess App (2024)",
			link: "https://locationbuddy.netlify.app/",
			description:
				"A React-based web app allowing users to share real-time location embeded in tokens with full of Security. Features include WebSocket updates, CSS React JavaScript frontend, Express Node.Js for backend ,storing the data of authentication use MYSQL.",
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
				"Developed a weather application using React.js and JavaScript, integrating the OpenWeather API for real-time forecasts. It features Google OAuth for secure authentication and AI-powered recommendations based on user location. I also implemented a real-time feedback system using Firebase Realtime Database to enhance user engagement and experience.",
		},

		{
			title: "Employee Management System(2023)",
			link: "https://employee-manage-app.netlify.app/",
			description:
				"A full-stack web application developed using React.js, Tailwind CSS, and Bootstrap on the frontend, with Node.js, Express.js, and MongoDB powering the backend. It features secure user google authentication using JWT, allowing only authorized users to access and manage data. The system supports full CRUD operations for employee records, including the ability to upload and update profile pictures.",
		},
	];

	return (
		<div className='work'>
			<h1 className='work-title'>Work Project</h1>
			<div className='work-container'>
				{projects.map((project, index) => (
					<div
						className='work-item'
						key={index}>
						<h2>{project.title}</h2>
						<a
							href={project.link}
							target='_blank'
							rel='noopener noreferrer'>
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
