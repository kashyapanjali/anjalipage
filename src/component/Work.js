/** @format */
import React from "react";
import "./Work.css";

function Work() {
	return (
		<div className='work'>
			<h1 className='work-title'>Recent Work Project</h1>
			<div className='work-container'>
				<div className='work-item'>
					<h2>Continue with - NeartoWomen</h2>
					<a
						href='https://github.com/kashyapanjali/neartowomenbackend'
						target='_blank'
						rel='noopener noreferrer'>
						Link
					</a>
					<span>
						<a
							href='https://github.com/kashyapanjali/womenapp'
							target='_blank'
							rel='noopener noreferrer'>
							| Link
						</a>
					</span>
					<p>
						A secure and scalable <b className='bold'>quick-commerce</b>{" "}
						platform exclusively for women’s health products, offering menstrual
						care, supplements, skincare, fitness, and medical devices. Users can
						browse, filter, and purchase products with secure checkout, order
						tracking, and personalized recommendations. The platform supports
						multi-vendor selling, real-time notifications, and AI-driven product
						suggestions, ensuring a seamless shopping experience.
						<b className='bold'>
							Tech Stack: CSS5, React.js, Node.js, Express.js, MongoDB, Payment
							Gateway Redux.
						</b>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Work;
