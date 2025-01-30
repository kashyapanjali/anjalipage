import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Firebase instance
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const adminEmails = ["anjali.official7061@gmail.com"]; // Admin emails list

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign in using Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Verify if the user is an admin
      if (!adminEmails.includes(email)) {
        setError("Access denied: You are not an admin.");
        return;
      }

      // Redirect to admin panel if admin
      navigate("/admin");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
