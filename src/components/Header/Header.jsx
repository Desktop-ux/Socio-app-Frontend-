import "./Header.css";
import Avatar from "../Avatar/Avatar";
import logo from '../../assets/transparent_logo.png'

export default function Header({goProfile}) {
  // get username safely
  const username = localStorage.getItem("username");

  return (
    <div className="app-header">
      {/* LEFT */}
      <h2 className="logo">
        <img src={logo} alt="" />
      </h2>

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
