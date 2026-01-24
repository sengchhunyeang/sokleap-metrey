'use client';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={`flex justify-center items-center gap-2 mt-4 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-[12px] rounded border border-[#ABAFB1] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5FA]"
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 text-[12px] rounded border border-[#ABAFB1] hover:bg-[#F5F5FA]"
          >
            1
          </button>
          {startPage > 2 && <span className="text-[#5E6366]">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-[12px] rounded border ${
            currentPage === page
              ? 'bg-[#142A4E] text-white border-[#142A4E]'
              : 'border-[#ABAFB1] hover:bg-[#F5F5FA]'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-[#5E6366]">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 text-[12px] rounded border border-[#ABAFB1] hover:bg-[#F5F5FA]"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-[12px] rounded border border-[#ABAFB1] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5FA]"
      >
        Next
      </button>
    </div>
  );
}
