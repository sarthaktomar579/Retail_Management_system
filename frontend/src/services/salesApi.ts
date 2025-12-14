const API_BASE = "https://backend-sigma-ten.vercel.app";

export async function getSales({ page, search, sort, filters }: any) {
  const params = new URLSearchParams();
  params.set("page", String(page));

  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);

  Object.entries(filters).forEach(([key, value]: any) => {
    if (value.length) params.set(key, value.join(","));
  });

  const res = await fetch(`${API_BASE}/api/Sale?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch sales");

  const json = await res.json();
  return json.data; // IMPORTANT
}
