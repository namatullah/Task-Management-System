const API_URL = "http://localhost:3001";

export async function list() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(`${API_URL}/projects`, {
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
    method: "PUT", // or PATCH depending on your NestJS API
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function remove(id: string) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
}
