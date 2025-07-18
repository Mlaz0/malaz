import React from "react";

const AdminPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors"
        disabled={currentPage === 1 || disabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        السابق
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          className={`px-3 py-1 rounded ${
            currentPage === idx + 1
              ? "bg-primary text-primary-foreground"
              : "border border-input hover:bg-accent transition-colors"
          }`}
          disabled={disabled}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors"
        disabled={currentPage === totalPages || disabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        التالي
      </button>
    </div>
  );
};

export default AdminPagination;
