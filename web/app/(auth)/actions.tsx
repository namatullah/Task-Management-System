"use server";

import { cookies } from "next/headers";

export async function signOutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("auth_token");
  cookieStore.delete("auth_user");

  try {
    const token = cookieStore.get("auth_token")?.value;
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Logout API error:", error);
  }

  return { success: true };
}
