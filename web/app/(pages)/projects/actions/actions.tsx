"use server";
import { create, edit, remove } from "@/app/_lib/projects";
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
  ownerId: z.string().optional(),
});
const CreateProject = FormSchema.omit({ id: true });

export async function createProject(prevState: State, formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    ownerId: formData.get("ownerId"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }
  const { name, description, ownerId } = validatedFields.data;
  try {
    await create({ name, description, ownerId });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Projects.",
    };
  }

  revalidatePath("/projects");
  redirect("/projects?toast=created");
}

const UpdateProject = FormSchema.omit({ id: true, ownerId: true });
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
      message: "",
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

  revalidatePath("/projects");
  redirect("/projects?toast=updated");
}

export async function deleteProject(id: string) {
  try {
    await remove(id);
  } catch (error) {
    return {
      message: "Database Error: Failed to update Projects.",
    };
  }

  revalidatePath("/projects");
  redirect("/projects?toast=deleted");
}
