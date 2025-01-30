/** @format */
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
	return (
		<div className="navbar">
			<div>
				<Link to="/">Home</Link>
			</div>
			<div>
				<Link to="/about">About</Link>
			</div>
			<div>
				<Link to="/work">Recent Work</Link>
			</div>
			<div>
				<Link to="/skills">Skills</Link>
			</div>
			<div>
				<Link to="/project">Projects</Link>
			</div>
			<div>
				<Link to="/certificate">Certificate</Link>
			</div>
			<div>
				<Link to="/contact">Get In Touch</Link>
			</div>
			<div>
				<Link to="/login">Me😊</Link>
				{/* this is admin panel only admin adjust*/}
			</div>
		</div>
	);
}

export default Navbar;
