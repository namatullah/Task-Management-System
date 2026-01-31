"use server";
import { create, edit } from "@/app/lib/projects";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

const CreateProject = FormSchema.omit({ id: true });

export async function createProject(prevState: State, formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create  projects",
    };
  }
  const { name, description } = validatedFields.data;
  try {
    await create({ name, description });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Projects.",
    };
  }

  revalidatePath("/pages/projects");
  redirect("/pages/projects");
}

const UpdateProject = FormSchema.omit({ id: true });
export async function updateProject(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateProject.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update  projects",
    };
  }
  const { name, description } = validatedFields.data;
  try {
    await edit(id, { name, description });
  } catch (error) {
    return {
      message: "Database Error: Failed to update Projects.",
    };
  }

  revalidatePath("/pages/projects");
  redirect("/pages/projects");
}
// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = UpdateInvoice.parse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });

//   const amountInCents = amount * 100;
//   try {
//     await pool.query(
//       `
//     UPDATE invoices
//     SET customer_id = ?, amount = ?, status = ?
//     WHERE id = ?
//   `,
//       [customerId, amountInCents, status, id],
//     );
//   } catch (error) {
//     console.error(error);
//     return { message: "Database Error: Failed to Update Invoice." };
//   }

//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }
