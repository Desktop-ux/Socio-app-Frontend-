import "./Header.css";
import Avatar from "../Avatar/Avatar";

export default function Header({goProfile}) {
  // get username safely
  const username = localStorage.getItem("username");

  return (
    <div className="app-header">
      {/* LEFT */}
      <h2 className="logo">Social</h2>

      {/* RIGHT */}
      <div className="header-right">
        <Avatar
          name={username}
          size={32}
          onclick={goProfile}
        />

      </div>
    </div>
  );
}
