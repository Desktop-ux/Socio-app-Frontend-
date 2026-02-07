import "./Header.css";
import Avatar from "../Avatar/Avatar";

export default function Header() {
  // get username safely
  const username = localStorage.getItem("username");

  return (
    <div className="app-header">
      {/* LEFT */}
      <h2 className="logo">Social</h2>

      {/* RIGHT */}
      <div className="header-right">
        <Avatar
          name={username || "U"}   // fallback to avoid '?'
          size={32}
        />
      </div>
    </div>
  );
}
