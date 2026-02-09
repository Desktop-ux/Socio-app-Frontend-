import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";
import CommentBox from "../CommentBox/CommentBox";
import LikeListModal from "../likeList/LikeListModal";
import Avatar from "../Avatar/Avatar";
import "./PostCard.css";

export default function PostCard({ post, refresh, onDelete }) {
  const { user } = useAuth();
  const isLiked = post.likes.includes(user?.username);

  const [showLikeModal, setShowLikeModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showHeart, setShowHeart] = useState(false);

  const handleLike = async () => {
    await api.post(`/posts/${post._id}/like`);
    refresh();
  };

  const handleDoubleTap = async () => {
    if (!isLiked) {
      setShowHeart(true);
      await handleLike();
      setTimeout(() => setShowHeart(false), 700);
    }
  };

  const handleDelete = async () => {
    await api.delete(`/posts/${post._id}`);
    onDelete(post._id);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user_detail">
          <Avatar name={post.username} size={36} />
        <span className="post-username">{post.username}</span>
        </div>
        

        {user?.id === post.userId && (
          <button className="delete-post-btn" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>

      {post.text && <p className="post-text">{post.text}</p>}

      {post.imageUrl && (
        <div
          className="post-image-wrapper"
          onDoubleClick={handleDoubleTap}
        >
          <img
            src={post.imageUrl}
            alt="post"
            className="post-image"
          />

          {showHeart && (
            <i className="fa-solid fa-heart heart-overlay"></i>
          )}
        </div>
      )}

      <div className="like-actions">
        <span
          onClick={handleLike}
          style={{
            color: isLiked ? "red" : "#333",
            fontSize: "22px",
            cursor: "pointer"
          }}
        >
          {isLiked ? (
            <i className="fa-solid fa-heart"></i>
          ) : (
            <i className="fa-regular fa-heart"></i>
          )}
        </span>

        <span
          className="like-count"
          onClick={() => {
            if (post.likes.length > 0) {
              setShowLikeModal(true);
            }
          }}
        >
          {post.likes.length} likes
        </span>
      </div>

      <CommentBox comments={post.comments} />

      <div className="comment-input-wrapper">
        <input
          className="comment-input"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button
          className="comment-send-btn"
          disabled={!commentText.trim()}
          onClick={async () => {
            await api.post(`/posts/${post._id}/comment`, {
              text: commentText
            });

            setCommentText("");
            refresh();
          }}
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>

      {showLikeModal && post.likes.length > 0 && (
        <LikeListModal
          likes={post.likes}
          onClose={() => setShowLikeModal(false)}
        />
      )}
    </div>
  );
}
