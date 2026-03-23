import React from "react";

const LoadingState = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        fontSize: "18px",
        color: "#F2782B",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span style={{ marginRight: "10px" }}>جاري التحميل...</span>
    </div>
  );
};

export default LoadingState;
