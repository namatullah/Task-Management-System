"use server";
import { create, edit, remove } from "@/app/_lib/projects";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signupUser } from "../_lib/auth";

export type SignUpState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

const SignUpFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Email is required"),
  confirmPassword: z.string().min(1, "Email is required"),
});

// const CreateProject = FormSchema.omit({ id: true });

export async function signup(prevState: SignUpState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to sign up",
    };
  }
  const { name, email, password, confirmPassword } = validatedFields.data;
  try {
    await signupUser({ name, email, password });
  } catch (error) {
    return {
      message: "Database Error: Failed to create account",
    };
  }

  redirect("/pages/dashboard");
}

// const UpdateProject = FormSchema.omit({ id: true });
// export async function updateProject(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateProject.safeParse({
//     name: formData.get("name"),
//     description: formData.get("description"),
//   });
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to update  projects",
//     };
//   }
//   const { name, description } = validatedFields.data;
//   try {
//     await edit(id, { name, description });
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to update Projects.",
//     };
//   }

//   revalidatePath("/pages/projects");
//   redirect("/pages/projects?toast=updated");
// }

// export async function deleteProject(id: string, prevState: State) {
//   try {
//     await remove(id);
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to update Projects.",
//     };
//   }

//   revalidatePath("/pages/projects");
//   redirect("/pages/projects?toast=deleted");
// }
