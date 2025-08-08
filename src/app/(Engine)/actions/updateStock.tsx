import { revalidatePath } from "next/cache";
import Product from "../models/productSchema";
import { connectToDb } from "../mongodb/database";

export const updateStock = async (formData) => {
  "use server";

  const { id, stock, type } = formData;

  console.log({
    id,
    stock,
    type,
  });

  try {
    connectToDb();

    const prod = await Product.findOne({ _id: id });
let newStock
    if (type === "Inc") {
       newStock = prod.stock + stock;
      console.log({ newStock, stock, prevStock: prod.stock });
      const product = await Product.findByIdAndUpdate(id, { stock: newStock });
    }
    if (type === "Dec") {
     newStock = prod.stock - stock;
      console.log({ newStock, stock, prevStock: prod.stock });
      const product = await Product.findByIdAndUpdate(id, { stock: newStock });
    }
    revalidatePath(`/`);

    return {
      ok: true,
      message: `${prod.name} stock is now ${newStock}`,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
