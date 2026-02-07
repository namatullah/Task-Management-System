import { deleteMember } from "@/app/_lib/project_member";
import { success } from "zod";

export async function deleteMemberAction(id: string) {
  try {
    await deleteMember(id);
    return { message: "Member is deleted successfully.", success: true };
  } catch (error) {
    return {
      message: "Database Error: Failed to update Projects.",
      success: false,
    };
  }
}
