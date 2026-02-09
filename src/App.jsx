import { useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import Feed from "./Pages/Feed/Feed";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
 
function App() {
  const { user, loading, setUser } = useAuth();
  const [page, setPage] = useState("feed");
  const createPostRef = useRef(null);

  if (loading) return null;

  if (!user) {
    return page === "login" ? (
      <Login
        onLogin={(userData) => {
          setUser(userData);
          setPage("feed");
        }}
        goSignup={() => setPage("signup")}
      />
    ) : (
      <Signup
        onSignin={(userData) => {
          setUser(userData);
          setPage("feed");
        }}
        goLogin={() => setPage("login")}
      />
    );
  }

 const handleLogout = async () => {
  try {
    await api.post("/auth/logout"); 
    setUser(null);
    setPage("login");
  } catch (err) {
    console.error("Logout failed");
  }
};

  const goHome = () => setPage("feed");
  const toggleProfile = () =>
    setPage((prev) => (prev === "profile" ? "feed" : "profile"));

  const scrollToCreatePost = () => {
    setPage("feed");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  return (
    <>
      <Sidebar
        goFeed={goHome}
        goProfile={toggleProfile}
        goCreate={scrollToCreatePost}
      />

      <Header goHome={goHome} goProfile={toggleProfile} />

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
