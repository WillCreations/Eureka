import { revalidatePath } from "next/cache";
import Client from "@/app/(Engine)/models/clientSchema";
import { connectToDb } from "../mongodb/database";

export const addClient = async (formData) => {
  "use server";
  const { name, email, phone, message } = Object.fromEntries(formData);

  console.log({ name, email, phone, message });

  try {
    connectToDb();

    const user = new Client({
      name,
      email,
      phone,
      message,
    });

    Object.entries(user).forEach(([key, value]) => {
      if (value === "" || undefined) {
        delete user[key];
      }
    });

    user.save();
  } catch (error) {
    console.log(error);
    throw new Error(" failed to add client");
  }

  revalidatePath(`/portfolio`);
};
