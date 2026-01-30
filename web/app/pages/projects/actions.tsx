"use server";
import { create } from "@/app/lib/projects";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

const CreateProject = FormSchema.omit({ id: true });

export async function createProject(prevState: State, formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create  projects",
    };
  }
  const { name, description } = validatedFields.data;
  try {
    await create({ name, description });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Projects.",
    };
  }

  revalidatePath("/pages/projects");
  redirect("/pages/projects");
}
