"use server";

import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export interface SignInFormState {
  message: string | null;
  errors: {
    email?: string[];
    password?: string[];
  };
  success: boolean;
  data?: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
    };
  };
}

export async function signInAction(
  prevState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = signInSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedFields.data),
      },
    );

    const data = await response.json();

    return {
      message: "Sign in was successful!",
      errors: {},
      success: true,
      data: {
        accessToken: data.accessToken,
        user: data.user,
      },
    };
  } catch (error) {
    return {
      message: "Network error. Please try again",
      errors: {},
      success: false,
    };
  }
}
