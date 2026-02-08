export async function updateProjectStatus(id: string, data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stepper/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}
