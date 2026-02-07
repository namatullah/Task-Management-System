"use server";

import { changeStatusMember } from "@/app/_lib/project_member";

export type FormState = {
  message: string | null;
  success: boolean;
};

export async function changeStatusMemberAction(
  id: string,
  prevState: FormState,
) {
  try {
    await changeStatusMember(id);
    return {
      message: "Member status changed successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error changing status:", error);
    return {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      success: false,
    };
  }
}
