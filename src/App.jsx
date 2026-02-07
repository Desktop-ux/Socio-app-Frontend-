import { useRef, useState } from "react";
import Feed from "./Pages/Feed/Feed";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";

function App() {
  /* ---------- APP STATE ---------- */
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);

  /* ---------- CREATE POST SCROLL REF ---------- */
  const createPostRef = useRef(null);

  /* ---------- AUTH HANDLERS ---------- */
  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setPage("feed");
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setPage("login");
  };
  const goHome = () => {
    setPage("feed");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* ---------- NAVIGATION HANDLERS ---------- */
  const goFeed = () => setPage("feed");

  const toggleProfile = () => {
    setPage((prev) => (prev === "profile" ? "feed" : "profile"));
  };

  const scrollToCreatePost = () => {

    setPage("feed");

    // Scroll after render
    setTimeout(() => {
      createPostRef.current?.scrollIntoView({
        behavior: "smooth",
        top:0
      });
    }, 0);
  };

  /* ---------- AUTH FLOW ---------- */
  if (!loggedIn) {
    return page === "login" ? (
      <Login
        onLogin={handleLoginSuccess}
        goSignup={() => setPage("signup")}
      />
    ) : (
      <Signup goLogin={() => setPage("login")} />
    );
  }

  /* ---------- APP UI ---------- */
  return (
    <>
      {/* HEADER (TOP) */}
      <Header
        goHome={goFeed}
        goProfile={toggleProfile}
      />

      {/* MAIN CONTENT */}
      <div className="app-content">
        {page === "feed" && (
          <Feed createPostRef={createPostRef} />
        )}

        {page === "profile" && (
          <Profile onLogout={handleLogout} />
        )}
      </div>

      {/* NAVBAR (BOTTOM) */}
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
