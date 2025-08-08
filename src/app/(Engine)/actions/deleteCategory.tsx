import { revalidatePath } from "next/cache";
import Category from "@/app/(Engine)/models/categorySchema";
import { connectToDb } from "../mongodb/database";

export const deleteCategory = async (id) => {
  "use server";

  try {
    await connectToDb();
    await Category.findByIdAndDelete(id);
    revalidatePath(`/`);
    return {
      ok: true,
      message: "deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
