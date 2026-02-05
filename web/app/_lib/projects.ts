const API_URL = "http://localhost:3001";

export async function list(
  query: string,
  page: number,
  ITEMS_PER_PAGE: number,
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const params = new URLSearchParams({
    query,
    page: page.toString(),
    ITEMS_PER_PAGE: ITEMS_PER_PAGE.toString(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?${params.toString()}`, {
    next: { revalidate: 100 },
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function create(data: any) {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function edit(id: string, data: any) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}
export async function getById(id: string) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to Fetch project");
  return res.json();
}
export async function remove(id: string) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
}
