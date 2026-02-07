import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import api from "../../api/api";
import "./../Login/Login.css";

export default function Signup({ onSignup, goLogin }) {
  const cardRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      return alert("Fill all fields");
    }

    await api.post("/auth/signup", {
      username,
      email,
      password,
    });

    // after signup → go to login
    onSignup();
  };

  return (
    <div className="auth-layout">
      {/* LEFT VISUAL (DESKTOP ONLY) */}
      <div className="auth-visual">
        <h1>Join the community</h1>
        <p>Create • Share • Connect</p>
      </div>

      {/* RIGHT FORM */}
      <div className="auth-form">
        <div className="auth-card" ref={cardRef}>
          <h2 className="auth-title">Create Account 🚀</h2>
          <p className="auth-subtitle">Sign up to get started</p>

          <div className="input-group">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
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
          </div>

          <button className="primary-btn" onClick={handleSignup}>
            Sign Up
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={goLogin}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
