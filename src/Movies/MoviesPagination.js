import React from "react";
import { Pagination } from "react-bootstrap";

export default function MoviesPagination({ page, setPage, total_pages }) {
  const adjustPage = (amount) => {
    setPage((prev) => prev + amount);
  };

  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
      {page !== 1 && (
        <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
      )}
      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 && (
        <Pagination.Item onClick={() => adjustPage(-1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {page < total_pages ? (
        <Pagination.Item onClick={() => adjustPage(1)}>
          {page + 1}
        </Pagination.Item>
      ) : null}
      {page < total_pages ? (
        <Pagination.Next onClick={() => adjustPage(1)} />
      ) : null}
    </Pagination>
  );
}
