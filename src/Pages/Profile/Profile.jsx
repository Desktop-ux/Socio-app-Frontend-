import Avatar from "../../components/Avatar/Avatar";
import "./Profile.css";

export default function Profile({ onLogout }) {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return (
    <div className="profile-page">
      <div className="profile-card">
        <Avatar name={username} size={80} />

        <h2 className="profile-username">{username}</h2>
        <p className="profile-email">{email}</p>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
