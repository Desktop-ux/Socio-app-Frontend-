import { useEffect, useState } from "react";
import api from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import FeedSkeleton from "../../components/FeedLoading/FeedLoading";
import "./feed.css";


export default function Feed({ createPostRef }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) {
    return (
      <div className="feed">
        <h2 className="feed-title">Feed</h2>
        <CreatePost ref={createPostRef} />
        <FeedSkeleton />
      </div>
    );
  }

  return (
    <div className="feed">
      <h2 className="feed-title">Feed</h2>

      <CreatePost refresh={fetchPosts} ref={createPostRef} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          refresh={fetchPosts}
          onDelete={handleDelete}
        />
      ))}

      <Navbar onLogout={() => window.location.reload()} />
    </div>
  );
}
