import { useEffect, useState } from "react";
import api from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import "./feed.css";

export default function Feed({createPostRef }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
  setPosts((prev) => prev.filter((p) => p._id !== id));
};


  return (
    <div className="feed">
      <h2 className="feed-title">Feed</h2>

      {/* CREATE POST */}
      <CreatePost refresh={fetchPosts} ref={createPostRef} />

      {/* POSTS */}
       {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          refresh={fetchPosts}
          onDelete={handleDelete}
        />
      ))}
      {/* NAVBAR */}
      <Navbar onLogout={() => window.location.reload()} />

    </div>
  );
}
