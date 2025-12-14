import "../styles/dashboard.css";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import FilterPanel from "../components/FilterPanel";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";
import useSalesData from "../hooks/useSalesData";

export default function Dashboard() {
  const {
    data,
    loading,
    page,
    totalPages,
    setPage,
    search,
    setSearch,
    sort,
    setSort,
    filters,
    setFilters,
  } = useSalesData();

  return (
    <div className="dashboard">
      <h1>Sales Management System</h1>

      <div className="top-bar">
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <FilterPanel filters={filters} setFilters={setFilters} />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <SalesTable data={data} />
      )}

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
