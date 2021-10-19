import React from "react";
import "./Pagination.css";

const Pagination = ({ totalDataNumber, postsPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDataNumber / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number, index) => (
          <li
            className="page__number"
            key={index}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
