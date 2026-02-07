import { useState } from "react";
import api from "../../api/api";
import "./Signup.css";

export default function Signup({ goLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      return alert("Fill all fields");
    }

    await api.post("/auth/signup", {
      username,
      email,
      password
    });

    alert("Signup successful. Please login.");
    goLogin();
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Sign Up</button>

      <p className="link" onClick={goLogin}>
        Already have an account? Login
      </p>
    </div>
  );
}
