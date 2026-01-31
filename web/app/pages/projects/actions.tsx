"use server";
import { create, edit, remove } from "@/app/lib/projects";
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

const UpdateProject = FormSchema.omit({ id: true });
export async function updateProject(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateProject.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update  projects",
    };
  }
  const { name, description } = validatedFields.data;
  try {
    await edit(id, { name, description });
  } catch (error) {
    return {
      message: "Database Error: Failed to update Projects.",
    };
  }

  revalidatePath("/pages/projects");
  redirect("/pages/projects");
}

export async function deleteProject(id: string, prevState: State) {
  try {
    await remove(id);
  } catch (error) {
    return {
      message: "Database Error: Failed to update Projects.",
    };
  }

  revalidatePath("/pages/projects");
  redirect("/pages/projects");
}
