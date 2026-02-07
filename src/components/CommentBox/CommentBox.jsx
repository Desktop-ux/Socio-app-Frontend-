import { useState } from "react";
import CommentCont from "../CommentCont/CommentCont";
import "./CommentBox.css";

export default function CommentList({ comments }) {
  const [showModal, setShowModal] = useState(false);

  const previewComments = comments.slice(-2); // last 2

  return (
    <div className="comment-list">
      {comments.length > 0 && (
        <p
          className="view-comments"
          onClick={() => setShowModal(true)}
        >
          View all {comments.length} comments
        </p>
      )}

      {previewComments.map((c, i) => (
        <p key={i} className="comment">
          <span className="comment-user">{c.username}</span>{" "}
          {c.text}
        </p>
      ))}

      {showModal && comments.length > 0 && (
        <CommentCont
          comments={comments}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
