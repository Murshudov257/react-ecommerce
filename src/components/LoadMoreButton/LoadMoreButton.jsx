import "./LoadMoreButton.css";

function LoadMoreButton({
  spinload,
  loadMoreData,
}) {
  return (
    <button
      className="load-more-button"
      onClick={loadMoreData}
      disabled={spinload}
    >
      {spinload ? (
        <>
          <div className="btn-spinner"></div>
          <span>Loading...</span>
        </>
      ) : (
        "Load More"
      )}
    </button>
  );
}

export default LoadMoreButton;