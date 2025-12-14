import { useEffect, useState } from "react";
import { getSales } from "../services/salesApi";
import type { Sale, Filters } from "../utils/types";

export default function useSalesData() {
  const [data, setData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [filters, setFilters] = useState<Filters>({
    region: [],
    gender: [],
    category: [],
    paymentMethod: [],
  });

  useEffect(() => {
    setLoading(true);
    getSales({ page, search, sort, filters }).then((res) => {
      setData(res.data);
      setTotalPages(res.totalPages);
      setLoading(false);
    });
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
