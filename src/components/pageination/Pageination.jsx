import React from "react";

// type Props = {
//   totalPages: number;
//   currentPage: number;
//   goToPage: (page: number) => void;
// };

export default function Pageination({ totalPages, currentPage, goToPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6 rtl:flex-row-reverse">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        السابق
      </button>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي
      </button>
    </div>
  );
}
