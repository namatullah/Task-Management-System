"use server";

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "Sign in failed" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Network error" };
  }
}

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "Sign up failed" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Network error" };
  }
}

export async function signOutAction() {
  // Clear cookies on server-side if needed
  return { success: true };
}
