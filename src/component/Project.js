/** @format */

import React from "react";

function Project() {
	return (
		<div className="work">
			<h1 className="work-title">Recent Work Project</h1>
			<div className="work-container">
				<div className="work-item">
					<h2>Docify(2024)</h2>
					<a href="https://github.com/PratyushPoddar07/nutrinerds">Link</a>
					<p>
						An innovative platform built during the IIT Dhanbad ISM Hackathon.
						Docify streamlines the Virtual AI power Medical Assistant ChatBot
						and Food Detection Consultancy through capturing photo,
						incorporating solve real world problems. Developed using python for
						backend and streamlit used for frontend.
					</p>
				</div>
				<div className="work-item">
					<h2>WeatherApp(2023)</h2>
					<a href="https://anjali-weather-app.netlify.app/">Link</a>
					<p>
						A project designed to provide users with real-time weather updates
						and forecasts based on their location. Built with HTML, CSS and
						JavaScript, the app integrates OpenWeatherMap's API to fetch
						accurate weather data. Features include location-based forecast and
						collect user feedback .
					</p>
				</div>
			</div>
		</div>
	);
}

export default Project;
