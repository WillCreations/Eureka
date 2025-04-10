import { revalidatePath } from "next/cache";
import Client from "@/app/(Engine)/models/clientSchema";
import { connectToDb } from "../mongodb/database";

export const addClient = async (formData) => {
  "use server";
  const { firstName, lastName, email, code, phone, message } =
    Object.fromEntries(formData);

  console.log({ firstName, lastName, email, code, phone, message });

  const Joined = `${code}${phone}`;
  console.log({ Joined });

  try {
    connectToDb();

    const user = new Client({
      firstName,
      lastName,
      email,
      phone: Joined,
      message,
      read: false,
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
