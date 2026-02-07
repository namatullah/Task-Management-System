"use server";

import { editMember } from "@/app/_lib/project_member";

export type FormState = {
  message: string | null;
  success: boolean;
};

export async function editMemberAction(
  id: string,
  prevState: FormState,
  formData: FormData,
) {
  const isAdmin = (formData.get("isAdmin") as string) || "off";
  console.log(isAdmin);
  try {
    await editMember(id, { isAdmin });
    return {
      message: "New member is edited successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error adding member:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      success: false,
    };
  }
}
