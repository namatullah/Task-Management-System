"use server";

import { changeStatus } from "@/app/_lib/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeStatusAction(id: string, prevState: any) {
  try {
    await changeStatus(id);
  } catch (error) {
    return {
      message: "Database Error: Failed to change user status.",
    };
  }

  revalidatePath("/users");
  redirect("/users?toast=change_status");
}
