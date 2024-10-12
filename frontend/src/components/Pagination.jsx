import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPagination } from "../redux/slices/getAllUserSlice";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

function Pagination() {
  const dispatch = useDispatch();
  const { limit, totalUsers, currentPage } = useSelector(
    (state) => state.allUsers
  );

  const totalPages = Math.ceil(totalUsers / limit);

  //Handle Previous Page
  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setPagination(currentPage - 1));
    }
  };

  //Handle Next Page
  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setPagination(currentPage + 1));
    }
  };

  //Handle Last Page

  const goToLastPage = () => {
    dispatch(setPagination(totalPages));
  };
   
  //Handle First Page
  const goToFirstPage = () => {
    dispatch(setPagination(1));
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-blue-500 text-white ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
      >
        1
      </button>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-blue-500 text-white border-x ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
      >
        <FaCaretLeft />
      </button>

      <span className="px-4 py-2 text-white bg-blue-500">{currentPage}</span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-blue-500 text-white border-x ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
      >
        <FaCaretRight />
      </button>
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-blue-500 text-white ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
      >
        {totalPages}
      </button>
    </div>
  );
}

export default Pagination;
