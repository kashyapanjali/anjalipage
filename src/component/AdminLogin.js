import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Firebase instance
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload
  
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Get Firebase ID Token
      const token = await user.getIdToken(); // Get the ID token after successful login
  
      // Store Token in LocalStorage
      localStorage.setItem("token", token);
  
      console.log("Admin logged in successfully!");
      console.log("Token retrieved:", token); // Log the token for debugging
  
      //Redirect to Admin Dashboard
      navigate("/admin");
  
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid credentials. Please try again.");
    }
  };
  
  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
