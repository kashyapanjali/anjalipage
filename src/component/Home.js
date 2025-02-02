import React, { useEffect, useState } from "react";
import { fetchPortfolio } from "../api";
import { io } from "socket.io-client";
import "./Home.css";

const socket = io("https://anjalipagebackend.onrender.com");

function Home() {
    const [profilePic, setProfilePic] = useState("https://via.placeholder.com/200");

    useEffect(() => {
        // Fetch portfolio data on mount
        const getPortfolioData = async () => {
            const data = await fetchPortfolio();
            if (data?.profilePic) setProfilePic(data.profilePic);
        };

        getPortfolioData();

        // Listen for real-time updates
        socket.on("portfolioUpdated", (data) => {
            if (data.profilePic) setProfilePic(data.profilePic);
        });

        return () => socket.off("portfolioUpdated");
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-text">
                    <h1>Anjali Kashyap</h1>
                    <p>
                        Hi, I'm <strong>Anjali Kashyap</strong>, a passionate{" "}
                        <strong>Full Stack Developer</strong> dedicated to crafting impactful 
                        digital experiences. I thrive on transforming ideas into reality with 
                        creativity, innovation, and precision.
                    </p>
                    <button className="cta-button">Let's get started &gt;</button>
                </div>

                {/* Profile Image (Read-Only) */}
                <div className="hero-image">
                    <img
                        src={profilePic || "https://via.placeholder.com/200"}
                        alt="Profile"
                        className="profile-photo"
                    />
                </div>
            </div>

            {/* Social Media Links */}
            <div className="company-logos">
                <div className="contactWith">Touch With:</div>
                <div className="logo">
                    <a href="https://www.linkedin.com/in/anjalikashyap97/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
                <div className="logo">
                    <a href="https://www.instagram.com/anjali_kashyap997/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <div className="logo">
                    <a href="https://x.com/anjali801421" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
                <div className="logo">
                    <a href="https://www.facebook.com/profile.php?id=61557864083972" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;
