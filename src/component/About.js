/* @format */
import React from "react";
import "./About.css";

function About() {
	return (
		<div className='about'>
			{/* <h1>Education</h1> */}
			<div className='about-container1'>
				<h1>Pursuing</h1>
				<div className='education-item'>
					<h2>Bachelor of Technology (B.Tech)</h2>
					<p>Driems University(Odisha)</p>
					<p>2022 - 2026</p>
					<p>CGPA:9.17</p>
					<p className='instituteLink'>
						<a href='https://www.driems.ac.in/'>College Link</a>
					</p>
				</div>
			</div>
			<div className='about-container2'>
				<h1>Highest Degree</h1>
				<div className='education-item'>
					<h2>Senior Secondary Education</h2>
					<p>Sushant Public School(Bihar-Muzaffarpur)</p>
					<p>2019 - 2021</p>
					<p>Marks:72%</p>
					<p className='instituteLink'>
						<a href='https://www.justdial.com/Muzaffarpur/Sushant-public-school-Nunfara-Piar/9999PX621-X621-220819223206-C5Z1_BZDET'>
							School link
						</a>
					</p>
				</div>
				<div className='education-item'>
					<h2>Secondary Education</h2>
					<p>Sushant Public School(Bihar-Muzaffarpur)</p>
					<p>2017 - 2019</p>
					<p>Marks:79.2%</p>
					<p className='instituteLink'>
						<a href='https://www.justdial.com/Muzaffarpur/Sushant-public-school-Nunfara-Piar/9999PX621-X621-220819223206-C5Z1_BZDET'>
							School link
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

export default About;
