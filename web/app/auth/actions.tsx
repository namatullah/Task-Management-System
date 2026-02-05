"use server";

import { cookies } from "next/headers";
import { z } from "zod";

// Define validation schema
const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type FormState = {
  message: string | null;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string[];
  };
  success?: boolean;
};

export async function signUpAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // Validate with zod
  const validatedFields = signUpSchema.safeParse(rawData);

  // If validation fails, return errors
  if (!validatedFields.success) {
    const errors: FormState["errors"] = {};

    // CORRECTED: Access ZodError issues property
    validatedFields.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof errors;
      if (!errors[field]) {
        errors[field] = [];
      }
      errors[field]!.push(issue.message);
    });

    return {
      message: "Please fix the errors below",
      errors,
      success: false,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedFields.data),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        message: "Sign up failed",
        errors: {
          general: [data.message || "Something went wrong"],
        },
        success: false,
      };
    }

    return {
      message: "Account created successfully! Redirecting to sign in...",
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      message: "Network error",
      errors: {
        general: ["Network error. Please try again."],
      },
      success: false,
    };
  }
}
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export async function signInAction(prevState: FormState, formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const result = signInSchema.safeParse(rawData);
  if (!result.success) {
    const errors: FormState["errors"] = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof FormState["errors"];

      if (field) {
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field]!.push(issue.message);
      }
    });

    return {
      message: "Please fix the errors below",
      errors,
      success: false,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        message: "Sign in failed",
        errors: {
          general: [data.message || "Invalid credentials"],
        },
        success: false,
      };
    }

    // Store tokens (you'll need to handle this differently)
    // For now, return success state
    return {
      message: "Sign in successful!",
      errors: {},
      success: true,
      data,
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      message: "Network error",
      errors: {
        general: ["Network error. Please try again."],
      },
      success: false,
    };
  }
}

export async function signOutAction() {
  const cookieStore = cookies();

  (await cookieStore).delete("auth_token");
  (await cookieStore).delete("auth_user");

  try {
    const token = (await cookieStore).get("auth_token")?.value;
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
    // Continue anyway - client-side logout is primary
  }
  return { success: true };
}
