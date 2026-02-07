import { useEffect } from "react";
import "./CommentCont.css";
import Avatar from "../Avatar/Avatar";

export default function CommentCont({ comments, onClose }) {
  useEffect
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="comment-backdrop" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="drag-bar"></div>

        <div className="comment-header">
          <span>Comments</span>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="comment-body">
          {comments.map((c, i) => (
            <div key={i} className="comment-row">
              <Avatar name={c.username} size={32} />
              <div>
                <span className="comment-user">{c.username}</span>
                <span className="comment-text">{c.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
