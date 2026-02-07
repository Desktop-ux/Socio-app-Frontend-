import { useEffect } from "react";
import "./likeList.css";
import Avatar from "../Avatar/Avatar";
export default function LikeListModal({ likes, onClose }) {

  useEffect(() => {
    // lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      // unlock scroll
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="like-modal-backdrop" onClick={onClose}>
      <div className="like-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="like-modal-header">
          <span>Likes</span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* LIST */}
        <div className="like-modal-list">
          {likes.map((user, index) => (
            <div key={index} className="like-user-row">
              <div className="like-user-left">
                <Avatar name={user} size={36} />
                <div className="like-username">{user}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
