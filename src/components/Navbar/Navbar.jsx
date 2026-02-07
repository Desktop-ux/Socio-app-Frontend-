import Avatar from "../Avatar/Avatar";
import "./Navbar.css";

export default function Navbar({
  active,
  goFeed,
  goCreate,
  goProfile,
}) {
  const username = localStorage.getItem("username");

  return (
    <div className="bottom-navbar">
      {/* FEED */}
      <button
        className={active === "feed" ? "active" : ""}
        onClick={goFeed}
      >
        🏠
      </button>

      {/* CREATE POST */}
      <button
        className={active === "create" ? "active" : ""}
        onClick={goCreate}
      >
        ➕
      </button>

      {/* PROFILE */}
      <div
        className={`nav-avatar ${active === "profile" ? "active" : ""}`}
        onClick={goProfile}
      >
        <Avatar name={username} size={26} />
      </div>
    </div>
  );
}
