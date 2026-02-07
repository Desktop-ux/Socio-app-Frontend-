import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import api from "../../api/api";
import "./Login.css";

export default function Login({ onLogin, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill all fields");

    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("username", res.data.user.username);
    localStorage.setItem("userId", res.data.user._id);

    onLogin();
  };

  return (
    <div className="auth-layout">
      {/* LEFT VISUAL (DESKTOP ONLY) */}
      <div className="auth-visual">
        {/* <h1>Share your moments</h1>
        <p>Post • Like • Connect</p> */}
      </div>
      {/* RIGHT FORM */}
      <div className="auth-form">
        <div className="auth-card" ref={cardRef}>
          <h2 className="auth-title">Welcome Back 👋</h2>
          <p className="auth-subtitle">Login to continue</p>

          <div className="input-group">
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

          <button className="primary-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="switch-text">
            Don’t have an account?{" "}
            <span onClick={goSignup}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
