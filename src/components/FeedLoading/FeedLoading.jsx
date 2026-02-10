function FeedSkeleton() {
  return (
    <div className="feed-skeleton">
      {[1, 2, 3].map((i) => (
        <div className="post-card-skeleton" key={i}>
          <div className="post-header-skeleton">
            <div className="avatar-skeleton"></div>
            <div className="user-info-skeleton">
              <div className="line short"></div>
              <div className="line tiny"></div>
            </div>
          </div>

          <div className="line"></div>
          <div className="line"></div>

          <div className="image-skeleton"></div>

          <div className="post-actions-skeleton">
            <div className="icon-skeleton"></div>
            <div className="icon-skeleton"></div>
            <div className="icon-skeleton"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedSkeleton;
