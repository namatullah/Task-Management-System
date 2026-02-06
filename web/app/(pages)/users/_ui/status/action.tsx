"use server";

import { changeRole } from "@/app/_lib/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeRoleAction(
  id: string,
  prevState: any,
  formData: FormData,
) {
  const role = formData.get("role") as string;

  try {
    await changeRole(id, { role });
  } catch (error) {
    console.log(error)
    return {
      message: "Database Error: Failed to change user role.",
    };
  }

  revalidatePath("/users");
  redirect("/users?toast=change_role");
}
