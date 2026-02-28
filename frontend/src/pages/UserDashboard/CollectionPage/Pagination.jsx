import React from "react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <button className="w-9 h-8 flex items-center justify-center border border-black text-black font-bold text-sm hover:bg-black hover:text-white transition-colors">
        1
      </button>
      
      <button className="w-14 h-8 flex items-center justify-center border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors">
        Next
      </button>
    </div>
  );
};

export default Pagination;