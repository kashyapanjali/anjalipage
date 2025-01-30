import axios from "axios";

// API Base URL
const API_BASE_URL = "http://localhost:5000/api/users";

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
