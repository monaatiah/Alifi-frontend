import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  maxPagesToShow = 5,
}) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="global-pagination">
      <ul>
        <li>
          <button
            type="button"
            aria-label="previous page"
            className="action-btn"
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            <FaArrowRight />
          </button>
        </li>
        {[...Array(Math.min(totalPages, maxPagesToShow))].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber}>
              <button
                type="button"
                className={currentPage === pageNumber ? "active" : ""}
                aria-label={`page ${pageNumber}`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-label="next page"
            className="action-btn next-btn"
            disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <FaArrowLeft />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
