"use server";

import { add } from "@/app/_lib/project_member";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const addMemberSchema = z.object({
  user: z.string().min(1, "Please select a user"),
  isAdmin: z.string().optional(),
  projectId: z.string().optional(),
});

export type FormState = {
  message: string | null;
  errors?: {
    user?: string[];
  };
};

export async function addMemberAction(
  prevState: FormState,
  formData: FormData,
) {
  const rawData = {
    user: formData.get("user"),
    isAdmin: formData.get("isAdmin"),
    projectId: formData.get("projectId"),
  };
  const validatedFields = addMemberSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { user, isAdmin, projectId } = validatedFields.data;
  try {
    await add({ user, isAdmin, projectId });
  } catch (error) {
    console.error("Error adding member:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      errors: {},
    };
  }

  revalidatePath(`/projects/${projectId}`);
  redirect("/projects/${projectId}?toast=created");
}
