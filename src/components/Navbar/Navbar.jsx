import "./Navbar.css";
import api from "../../api/api";

export default function Navbar({ onLogout }) {
  return (
    <div className="navbar">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        🏠
      </button>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ➕
      </button>

      <button
        onClick={async () => {
          await api.post("/auth/logout");
          onLogout();
        }}
      >
        🚪
      </button>
    </div>
  );
}
