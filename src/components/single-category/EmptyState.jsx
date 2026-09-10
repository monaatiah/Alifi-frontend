import React from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const EmptyState = ({ hasActiveFilters = false, onResetFilters }) => {
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
        textAlign: "center",
      }}
    >
      <p aria-hidden="true" style={{ fontSize: "48px", marginBottom: "20px" }}>
        {hasActiveFilters ? "🔍" : "🐾"}
      </p>
      <h4 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
        <FormattedMessage
          id={hasActiveFilters ? "noMatchingProductsTitle" : "categoryEmptyTitle"}
        />
      </h4>
      <p style={{ fontSize: "16px", color: "#999", marginBottom: "24px" }}>
        <FormattedMessage
          id={hasActiveFilters ? "noMatchingProductsHint" : "categoryEmptyHint"}
        />
      </p>
      {hasActiveFilters ? (
        <button type="button" className="btn" onClick={onResetFilters}>
          <FormattedMessage id="clearFilters" />
        </button>
      ) : (
        <Link href="/shop" className="btn">
          <FormattedMessage id="browseAllProducts" />
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
