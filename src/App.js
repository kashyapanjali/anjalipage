/** @format */

import "./App.css";
import Home from "./component/Home";
import About from "./component/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Work from "./component/Work";
import Skill from "./component/Skill";
import Project from "./component/Project";
import Certificate from "./component/Certificate";
import Contact from "./component/Contact";
import AdminLogin from "./component/AdminLogin";
import Admin from "./component/Admin";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<AdminLogin />} />
				<Route path="/admin" element={<Admin/>} />
				<Route path="/about" element={<About />} />
				<Route path="/work" element={<Work />} />
				<Route path="/skills" element={<Skill />} />
				<Route path="/project" element={<Project />} />
				<Route path="/certificate" element={<Certificate />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</Router>
	);
}

export default App;
