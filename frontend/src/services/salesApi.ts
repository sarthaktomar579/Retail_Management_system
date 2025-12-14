export async function getSales({ page, search, sort, filters }: any) {
  const params = new URLSearchParams();
  params.set("page", String(page));

  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);

  Object.entries(filters).forEach(([key, value]: any) => {
    if (value.length) params.set(key, value.join(","));
  });

  const res = await fetch(
    `http://localhost:5000/api/sales?${params.toString()}`
  );
  return res.json();
}
