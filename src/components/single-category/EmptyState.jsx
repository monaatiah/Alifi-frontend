import React from "react";

const EmptyState = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        fontSize: "20px",
        color: "#666",
      }}
    >
      <p style={{ fontSize: "48px", marginBottom: "20px" }}>🔍</p>
      <p style={{ fontWeight: "bold", marginBottom: "10px" }}>لا توجد نتائج</p>
      <p style={{ fontSize: "16px", color: "#999" }}>
        لم نتمكن من العثور على أي منتجات تطابق بحثك
      </p>
    </div>
  );
};

export default EmptyState;
