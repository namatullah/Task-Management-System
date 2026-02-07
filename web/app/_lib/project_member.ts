export async function addMember(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getMembers(id: string) {
  const params = new URLSearchParams({
    projectId: id,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/members?${params.toString()}`,
    { next: { revalidate: 100 } },
  );
  if (!res.ok) throw new Error("Failed to fetch members");

  return res.json();
}

export async function editMember(id: string, data: { isAdmin: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update member");
  return res.json();
}

export async function changeStatusMember(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to change status");
  return res.json();
}

export async function deleteMember(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete member");
  return res.json();
}
