import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeRoleAction(id: string, formData: FormData) {
  const role = formData.get("role");

  try {
    await changeRole(id, { role });
  } catch (error) {
    return {
      message: "Database Error: Failed to update Projects.",
    };
  }

  revalidatePath("/users");
  redirect("/users?toast=change_role");
}
