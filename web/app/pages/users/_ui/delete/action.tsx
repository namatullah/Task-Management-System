"use server";
import { remove } from "@/app/_lib/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser(id: string) {
  try {
    await remove(id);
  } catch (error) {
    return {
      message: "Database Error: Failed to update users.",
    };
  }

  revalidatePath("/pages/users");
  redirect("/pages/users?toast=deleted");
}
