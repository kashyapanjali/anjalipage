import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Navigation Bar */}
      <div className="navbar">
        <div><a href="/">Home</a></div>
        <div><a href="/about">About</a></div>
        <div><a href="/work">Recent Work</a></div>
        <div><a href="/skills">Skills</a></div>
        <div><a href="/project">Projects</a></div>
        <div><a href="/blog">Certificate</a></div>
        <div><a href="/contact">Get In Touch</a></div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>Anjali Kashyap</h1>
          <p>
            Hi, I’m <strong>Anjali Kashyap</strong>, a passionate <strong>Full Stack Developer</strong> dedicated to crafting impactful digital experiences. I thrive on transforming ideas into reality with creativity, innovation, and precision.
          </p>

          <button className="cta-button">Let’s get started &gt;</button>
        </div>
        <div className="hero-image">
          <img
            src="https://via.placeholder.com/200"
            alt="Profile"
            className="profile-photo"
          />
        </div>
      </div>

      {/* Company Logos */}
      <div className="company-logos">
        <div className="logo">ClickUp</div>
        <div className="logo">Dropbox</div>
        <div className="logo">PAYCHEX</div>
        <div className="logo">Elastic</div>
        <div className="logo">Stripe</div>
      </div>
    </div>
  );
}

export default Home;
