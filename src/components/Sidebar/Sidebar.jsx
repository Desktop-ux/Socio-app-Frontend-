import "./Sidebar.css";
import Avatar from "../Avatar/Avatar";
import logo from '../../assets/transparent_logo.png'

export default function Sidebar({ goFeed, goProfile, goCreate }) {
    const username = localStorage.getItem("username");

    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>

            <nav className="sidebar-nav">
                <button onClick={goFeed}>🏠 Home</button>
                <button onClick={goProfile}>👤 Profile</button>
                <button onClick={goCreate}>➕ Create</button>
                <div className="sidebar-user" onClick={goProfile}>
                    <Avatar name={username} size={40} />
                    <span>{username}</span>
                </div>
            </nav>


        </div>
    );
}
