interface Props {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

const Pagination = ({ page, totalPages, setPage }: Props) => {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <span>{page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
