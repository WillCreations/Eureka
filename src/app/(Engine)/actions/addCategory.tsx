import { revalidatePath } from "next/cache";
import Category from "@/app/(Engine)/models/categorySchema";
import { connectToDb } from "../mongodb/database";

export const addCategory = async (formData) => {
  "use server";
  const { newCategory } = Object.fromEntries(formData);

  console.log({ newCategory });

  try {
    connectToDb();
    const exists = await Category.findOne({ category: newCategory });
    console.log(exists);
    if (exists) {
      throw new Error("Category already exists");
    }

    const cate = new Category({ category: newCategory });

    cate.save();
    revalidatePath(`/`);

    return {
      ok: true,
      message: `${cate.category} category added successfully`,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
