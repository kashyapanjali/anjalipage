/** @format */

import "./App.css";
import Home from "./component/Home";
import About from "./component/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Work from "./component/Work";
import Skill from "./component/Skill";
import Project from "./component/Project";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/work" element={<Work />} />
				<Route path="/skills" element={<Skill />} />
				<Route path="/project" element={<Project />} />
			</Routes>
		</Router>
	);
}

export default App;
