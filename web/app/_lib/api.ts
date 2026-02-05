import { cookies } from "next/headers";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Handle token expiration
    throw new Error("Unauthorized");
  }

  return response;
}
