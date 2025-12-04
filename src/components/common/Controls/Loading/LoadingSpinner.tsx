import "./loadingSpinner.css";

export const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner">
        <div className="spinner-icon">🔒</div>
        <div className="spinner-text">Loading...</div>
      </div>
    </div>
  );
};

