"use server";

import { addMember } from "@/app/_lib/project_member";
import { z } from "zod";

const addMemberSchema = z.object({
  userId: z.string().min(1, "Please select a user"),
  isAdmin: z.string().optional(),
  projectId: z.string().optional(),
});

export type FormState = {
  message: string | null;
  errors?: {
    userId?: string[];
  };
  success: boolean;
};

export async function EditMemberAction(
  prevState: FormState,
  formData: FormData,
) {
  const rawData = {
    userId: formData.get("userId"),
    isAdmin: formData.get("isAdmin") || "off",
    projectId: formData.get("projectId"),
  };
  const validatedFields = addMemberSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  const { userId, projectId, isAdmin } = validatedFields.data;
  try {
    await addMember({ userId, projectId, isAdmin });
    return {
      message: "New member is added successfully",
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error adding member:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      errors: {},
      success: false,
    };
  }
}
