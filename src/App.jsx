import { useState } from "react";
import Feed from "./Pages/Feed/Feed";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import Header from "./components/Header/Header";
import BottomNavbar from "./components/Navbar/Navbar";

function App() {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);

  /* ---------- AUTH FLOW ---------- */
  if (!loggedIn) {
    return page === "login" ? (
      <Login
        onLogin={() => {
          setLoggedIn(true);
          setPage("feed");
        }}
        goSignup={() => setPage("signup")}
      />
    ) : (
      <Signup goLogin={() => setPage("login")} />
    );
  }

  // LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setPage("login");
  };
  const toggleProfile = () => {
  setPage((prev) => (prev === "profile" ? "feed" : "profile"));
};


  /* ---------- APP FLOW ---------- */
  return (
    <>
      {/* TOP HEADER */}
      <Header
        goHome={() => setPage("feed")}
        goProfile={toggleProfile}
      />

      {/* MAIN CONTENT */}
      <div className="app-content">
        {page === "feed" && <Feed />}
        {page === "profile" && (
          <Profile onLogout={handleLogout} />
        )}
      </div>

      {/* BOTTOM NAVBAR (MOBILE) */}
      <BottomNavbar
        active={page}
        goHome={() => setPage("feed")}
        goCreate={() => setPage("feed")}
        goProfile={() => setPage("profile")}
      />
    </>
  );
}

export default App;
