"use server";

import { updateProjectStatus } from "@/app/_lib/projects";
import { z } from "zod";

const changeStepSchema = z.object({
  notes: z.string().min(1, "Please write some notes"),
  id: z.string().optional(),
  userId: z.string().optional(),
  status: z.string().optional(),
  isForward: z
    .string()
    .optional()
    .transform((val) => val === "true"), 

  isFinal: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

export type FormState = {
  message: string | null;
  errors?: {
    notes?: string[];
  };
  success: boolean;
};

export async function changeStepAction(
  prevState: FormState,
  formData: FormData,
) {
  const rawData = {
    notes: formData.get("notes"),
    id: formData.get("id"),
    userId: formData.get("userId"),
    status: formData.get("status"),
    isForward: formData.get("isForward"),
    isFinal: formData.get("isFinal"),
  };
  const validatedFields = changeStepSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  console.log(validatedFields.data);
  const { userId, id, notes, status, isForward, isFinal } =
    validatedFields.data;
  try {
    await updateProjectStatus(id, {
      userId,
      notes,
      status,
      isForward,
      isFinal,
    });
    return {
      message: "Successfully moved to next step",
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error moving:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      errors: {},
      success: false,
    };
  }
}
