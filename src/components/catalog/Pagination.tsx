import React from 'react';

interface IPagination {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
}
const Pagination = ({ postsPerPage, totalPosts, paginate }: IPagination) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination pagination-lg mt-5 justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link " href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
