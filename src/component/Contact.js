/** @format */
import React from "react";
import "./Contact.css";

function Contact() {
	return (
		<div id="contact" className="contact">
			<h1 className="contact-title">Get in Touch</h1>
			<div className="contact-container">
				<div className="contact-item">
					<h2>Email</h2>
					<p>
						<a href="mailto:anjalikashyap9608@gmail.com">
							anjalikashyap9608@gmail.com
						</a>
					</p>
				</div>
				<div className="contact-item">
					<h2>Phone</h2>
					<p>
						<a href="tel:+919608411997">+91 9608411997</a>
					</p>
				</div>
				<div className="contact-item">
					<h2>LinkedIn</h2>
					<p>
						<a
							href="https://www.linkedin.com/in/anjalikashyap97/"
							target="_blank"
							rel="noreferrer">
							linkedin.com/in/anjalikashyap
						</a>
					</p>
				</div>
				<div className="contact-item">
					<h2>GitHub</h2>
					<p>
						<a
							href="https://github.com/kashyapanjali"
							target="_blank"
							rel="noreferrer">
							github.com/anjalikashyap
						</a>
					</p>
				</div>
				<div className="contact-item">
					<h2>Location</h2>
					<p>Tangi - Cuttack, Odisha, India</p>
				</div>
			</div>
		</div>
	);
}

export default Contact;
