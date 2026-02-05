const API_URL = "http://localhost:3001";

export async function signupUser(data: any) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function signinUser(data: any) {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function me() {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    cache: "no-store",
  });
console.log(res)
  if (!res.ok) {
    throw new Error("Failed to Fetch me");
  }

  return res.json();
}
