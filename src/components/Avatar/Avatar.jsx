import "./Avatar.css";

export default function Avatar({ name, size = 36 , onclick }) {
  const letter = name ? name[0].toUpperCase() : "?";

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size / 2
      }}
      onClick={onclick}
    >
      {letter}
    </div>
  );
}
