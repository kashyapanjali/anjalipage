import React, { useState } from "react";
import axios from "axios";
import "./Certificate.css";

function Certificate() {
    const [certificates, setCertificates] = useState({
        Internship: [],
        Course: [],
        Completion: []
    });

    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [certificateLink, setCertificateLink] = useState("");
    const [message, setMessage] = useState("");

    // Handle adding new certificate
    const handleAddCertificate = async () => {
        if (!selectedCategory || certificateLink.trim() === "") {
            setMessage("Please select a category and enter a certificate link.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/admin/certificates',
                {
                    category: selectedCategory,
                    link: certificateLink
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'admin-key': 'anjalikashyap9608'
                    }
                }
            );

            // Update local state
            setCertificates(prevCertificates => ({
                ...prevCertificates,
                [selectedCategory]: [
                    ...prevCertificates[selectedCategory],
                    certificateLink
                ]
            }));

            setMessage("Certificate added successfully!");
            setCertificateLink("");
            setSelectedCategory("");
            setShowForm(false);
        } catch (error) {
            console.error('Error adding certificate:', error);
            setMessage('Error adding certificate. Please try again.');
        }
    };

    // Category display names mapping
    const categoryDisplayNames = {
        Internship: "Intern Certificates",
        Course: "Course Certificates",
        Completion: "Completion Certificates"
    };

    return (
        <div className="certificate">
            <h1 className="certificate-title">My Certificates</h1>

            {/* Certificate Categories */}
            <div className="certificate-container">
                {Object.keys(certificates).map((category) => (
                    <div className="certificate-category" key={category}>
                        <h2>{categoryDisplayNames[category]}</h2>
                        <ul>
                            {certificates[category].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {`${categoryDisplayNames[category].slice(0, -12)} Certificate ${index + 1}`}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Add Certificate Button */}
            <button className="add-certificate-button" onClick={() => setShowForm(true)}>
                +
            </button>

            {/* Add Certificate Form */}
            {showForm && (
                <div className="add-certificate-form">
                    {/* Select Category */}
                    <select
                        className="dropdown"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Internship">Intern Certificates</option>
                        <option value="Course">Course Certificates</option>
                        <option value="Completion">Completion Certificates</option>
                    </select>

                    {/* Input New Certificate */}
                    <input
                        type="text"
                        placeholder="Enter certificate link"
                        value={certificateLink}
                        onChange={(e) => setCertificateLink(e.target.value)}
                    />

                    {/* Form Buttons */}
                    <div className="form-buttons">
                        <button onClick={handleAddCertificate} className="save-button">
                            Add Certificate
                        </button>
                        <button onClick={() => setShowForm(false)} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Message display */}
            {message && (
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Certificate;