"use server";

import { z } from "zod";

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

export interface SignUpFormState {
  message: string | null;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  success: boolean;
}

export async function signUpAction(
  prevState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validatedFields = signUpSchema.safeParse(rawData);

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
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedFields.data),
      },
    );

    return {
      message: "Account created successfully!",
      errors: {},
      success: true,
    };
  } catch (error) {
    return {
      message: "Network error. Please try again",
      errors: {},
      success: false,
    };
  }
}
