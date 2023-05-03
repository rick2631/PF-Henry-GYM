import { useState } from "react";
import "./Pagination.css"

const Pagination = ({ exercisesPerPage, totalExercises, paginate }) => {
  const [num, setNum] = useState(1);

  const totalPages = Math.ceil(totalExercises / exercisesPerPage);

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];

  function Next() {
    if (num + 4 <= totalPages) {
      setNum(num + 1);
    }
  }

  function back() {
    if (num > 1) {
      setNum(num - 1);
    }
  }

  return (
   <div className="pagination">
    <div className="flex bg-neutral-800 rounded-lg font-[Poppins]">
      <button
        onClick={back}
        className="h-12 border-2 border-r-0 border-yellow-500 px-4 rounded-l-lg hover:bg-neutral-900 hover:text-yellow-500"
      >
        <svg
          class="w-4 h-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      {pages.map((pg, i) => (
        <button
          key={i}
          onClick={() => paginate(pg.page)}
          className= {`h-12 border-2 border-r-0 border-yellow-500 w-12 ${
            pg.page === num ? "bg-neutral-900 text-white-500" : ""
          }`}
        >
          {pg.page}
        </button>
      ))}
      <button
        onClick={Next}
        className="h-12 border-2  border-yellow-500 px-4 rounded-r-lg bg-neutral-900 hover:text-yellow-500"
      >
        <svg
          class="w-4 h-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
   </div>
  );
};

export default Pagination;