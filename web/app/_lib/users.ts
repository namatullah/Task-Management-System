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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?${params.toString()}`,
    {
      next: { revalidate: 100 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function remove(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}

export async function changeRole(id: string, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/change_role`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) throw new Error("Failed to change user role");
  return res.json();
}

export async function changeStatus(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!res.ok) throw new Error("Failed to change user status");
  return res.json();
}

export async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/all`, {
    next: { revalidate: 100 }, //0 same as { cache: 'no-store' }
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
