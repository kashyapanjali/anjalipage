import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios
import "./Home.css";

function Home() {
    const [imageFile, setImageFile] = useState(null);
    const [profileData, setProfileData] = useState(null);

    // Fetch profile data when component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile');
                setProfileData(response.data);
                if (response.data.profilePic) {
                    setImageFile(response.data.profilePic);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        
        fetchProfile();
    }, []);

    // Function to handle image selection and upload
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Create FormData object
                const formData = new FormData();
                formData.append('profilePic', file);

                // Upload image
                const response = await axios.put(
                    'http://localhost:5000/api/users/admin/profile-pic',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'admin-key': 'anjalikashyap9608'
                        }
                    }
                );

                // Update image preview and profile data
                setProfileData(response.data.user);
                setImageFile(response.data.user.profilePic);
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Error uploading image. Please try again.');
            }
        }
    };

    const handleCircleClick = () => {
        document.getElementById("imageInput").click();
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-text">
                    <h1>Anjali Kashyap</h1>
                    <p>
                        Hi, I'm <strong>Anjali Kashyap</strong>, a passionate{" "}
                        <strong>Full Stack Developer</strong> dedicated to crafting
                        impactful digital experiences. I thrive on transforming ideas into
                        reality with creativity, innovation, and precision.
                    </p>

                    <button className="cta-button">Let's get started &gt;</button>
                </div>
                <div className="hero-image" onClick={handleCircleClick}>
                    <img
                        src={imageFile || "https://via.placeholder.com/200"}
                        alt="Profile"
                        className="profile-photo"
                    />
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                </div>
            </div>

            {/* Company Logos */}
            <div className="company-logos">
                <div className="contactWith">Touch With:</div>
                <div className="logo">
                    <a
                        href="https://www.linkedin.com/in/anjalikashyap97/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
                <div className="logo">
                    <a
                        href="https://www.instagram.com/anjali_kashyap997/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <div className="logo">
                    <a
                        href="https://x.com/anjali801421"
                        target="_blank"
                        rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
                <div className="logo">
                    <a
                        href="https://www.facebook.com/profile.php?id=61557864083972"
                        target="_blank"
                        rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;