export async function add(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
