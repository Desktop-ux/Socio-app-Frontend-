import { useState } from "react";
import api from "../../api/api";
import CommentBox from "../CommentBox/CommentBox";
import LikeListModal from "../likeList/LikeListModal";
import Avatar from "../Avatar/Avatar";
import "./PostCard.css";

export default function PostCard({ post, refresh }) {
  const currentUser = localStorage.getItem("username");
  const isLiked = post.likes.includes(currentUser);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [showLikes, setShowLikes] = useState(false);
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

  return (
    <div className="post-card">
      <div className="post-header">
        <Avatar name={post.username} size={36} />
        <span className="post-username">{post.username}</span>
      </div>

      {post.text && <p className="post-text">{post.text}</p>}

      {/* IMAGE WITH DOUBLE TAP */}
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

      {/* ACTIONS */}
      <div className="like-actions">
        {/* LIKE ICON */}
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

      {/* LIKED USERS */}
      {showLikes && post.likes.length > 0 && (
        <div className="liked-users">
          Liked by{" "}
          {post.likes.map((user, i) => (
            <span key={i} className="liked-user">
              {user}
              {i < post.likes.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      )}

      {/* COMMENTS */}
      <CommentBox comments={post.comments} />

      {/* ADD COMMENT */}
     
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
            if (!commentText.trim()) return;

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
