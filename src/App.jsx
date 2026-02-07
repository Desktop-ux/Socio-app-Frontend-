import { useRef, useState } from "react";
import Feed from "./Pages/Feed/Feed";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  /* ---------- APP STATE ---------- */
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);

  /* ---------- CREATE POST SCROLL REF ---------- */
  const createPostRef = useRef(null);

  /* ---------- AUTH HANDLERS ---------- */
  const handleAuthSuccess = () => {
    setLoggedIn(true);
    setPage("feed");
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setPage("login");
  };

  /* ---------- NAVIGATION ---------- */
  const goHome = () => {
    setPage("feed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goFeed = () => setPage("feed");

  const toggleProfile = () => {
    setPage((prev) => (prev === "profile" ? "feed" : "profile"));
  };

  const scrollToCreatePost = () => {
    setPage("feed");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  /* ---------- AUTH FLOW ---------- */
  if (!loggedIn) {
    return page === "login" ? (
      <Login
        onLogin={handleAuthSuccess}
        goSignup={() => setPage("signup")}
      />
    ) : (
      <Signup
        onSignin={handleAuthSuccess}
        goLogin={() => setPage("login")}
      />
    );
  }

  /* ---------- APP UI ---------- */
  return (
    <>
      <Sidebar
        goFeed={goFeed}
        goProfile={toggleProfile}
        goCreate={scrollToCreatePost}
      />

      <Header
        goHome={goFeed}
        goProfile={toggleProfile}
      />

      <div className="app-content">
        {page === "feed" && <Feed createPostRef={createPostRef} />}
        {page === "profile" && <Profile onLogout={handleLogout} />}
      </div>

      <Navbar
        active={page}
        goFeed={goHome}
        goCreate={scrollToCreatePost}
        goProfile={toggleProfile}
      />
    </>
  );
}

export default App;
