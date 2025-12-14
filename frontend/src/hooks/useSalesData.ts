import { useEffect, useState } from "react";
import { getSales } from "../services/salesApi";

import { Filters } from "../utils/types";

const initialFilters: Filters = {
  region: [],
  gender: [],
  category: [],
  paymentMethod: [],
};
export default function useSalesData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setLoading(true);

    getSales({ page, search, sort, filters })
      .then((res) => {
        setData(res.data);          // ✅ IMPORTANT
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page, search, sort, filters]);

  return {
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
  };
}
