const Pagination = ({ currentPage, totalPages, goToPage }) => {
    return (
      <div className="flex relative  justify-center items-center gap-2 mt-6 mb-4">
        {currentPage > 1 && (
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-4 py-2  h-[30px] w-[80px] bg-[#0A1B3D] text-gray-300 hover:bg-[#13294B] hover:text-white rounded-lg text-sm transition-colors"
          >
            السابق
          </button>
        )}
  
        {/* أرقام الصفحات */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1  h-[30px] w-[80px] rounded-lg text-sm transition-colors ${
              currentPage === i + 1
                ? "bg-blue-500  h-[30px] w-[80px] text-white"
                : "bg-[#0A1B3D] text-gray-300 h-[30px] w-[80px] hover:bg-[#13294B] hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
  
        {currentPage < totalPages && (
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-4 py-2 bg-[#0A1B3D] text-gray-300  h-[30px] w-[80px] hover:bg-[#13294B] hover:text-white rounded-lg text-sm transition-colors"
          >
            التالي
          </button>
        )}
      </div>
    );
  };
  
  export default Pagination;
  