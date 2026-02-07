import { useState, forwardRef } from "react";
import api from "../../api/api";
import "./CreatePost.css";

const CreatePost = forwardRef(({ refresh }, ref) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handlePost = async () => {
    if (!text && !image) {
      alert("Post cannot be empty");
      return;
    }

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (image) formData.append("image", image);

    await api.post("/posts", formData);

    // reset after post
    setText("");
    setImage(null);
    setPreview(null);
    refresh();
  };

  return (
    <div ref={ref} className="create-post">
      <h2>Create Post</h2>
      {/* TEXT */}
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* IMAGE PREVIEW */}
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="preview" />
          <span
            className="remove-image"
            onClick={() => {
              setImage(null);
              setPreview(null);
            }}
          >
            ✕
          </span>
        </div>
      )}

      {/* ACTIONS */}
      <div className="create-actions">
        <label className="image-picker">
          Add Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
});

export default CreatePost;
