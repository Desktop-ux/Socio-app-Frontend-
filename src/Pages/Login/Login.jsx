import { useState } from "react";
import api from "../../api/api";
import "./Login.css";

export default function Login({ onLogin, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Fill all fields");
    }

    try {
      // 🔑 GET RESPONSE
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ SAVE USER INFO (THIS FIXES HEADER)
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("userId", res.data.user._id);

      // optional: if backend sends token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ CONTINUE APP FLOW
      onLogin();

    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p onClick={goSignup} className="link">
        Don’t have an account? Sign up
      </p>
    </div>
  );
}
