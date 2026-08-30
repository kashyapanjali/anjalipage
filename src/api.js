import axios from "axios";

const isLocal =
	typeof window !== "undefined" &&
	(window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1");

export const SERVER_URL =
	process.env.REACT_APP_SERVER_URL ||
	(isLocal ?
		"http://localhost:5000"
	:	"https://anjalipagebackend.onrender.com");

export const API_BASE_URL = `${SERVER_URL}/api/users`;

// Fetch portfolio data
export const fetchPortfolio = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/portfolio`);
		return response.data;
	} catch (error) {
		console.error("Error fetching portfolio:", error);
		return null;
	}
};
