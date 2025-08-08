import { revalidatePath } from "next/cache";
import Product from "@/app/(Engine)/models/productSchema";
import Rate from "@/app/(Engine)/models/rateSchema";
import User from "@/app/(Engine)/models/user";
import { connectToDb } from "../mongodb/database";

export const rateProduct = async (prodId, raterId, rate) => {
  "use server";
  console.log({ prodId, raterId, rate });
  try {
    connectToDb();
    const exist = await Rate.findOne({
      productId: { $in: [prodId] },
      userId: { $in: [raterId] },
    });

    const UpdateProductRate = async () => {
      const prod = await Product.findOne({ _id: prodId });
      let newTotal;
      console.log({ prod_totalRate: prod.totalRates });
      if (isNaN(prod.totalRates)) {
        newTotal = rate;
      } else {
        newTotal = prod.totalRates += rate;
      }

      const allRates = await Rate.find({
        productId: { $in: [prodId] },
      });
      console.log({ newTotal, allRates: allRates.length });
      const newAverage = newTotal / allRates.length;
      await Product.findByIdAndUpdate(prodId, {
        totalRates: newTotal,
        averageRate: newAverage,
      });
    };

    console.log({ exist });
    if (exist) {
      const RateObj = await Rate.findByIdAndUpdate(exist._id, { rate });
      const prod = await Product.findOne({ _id: prodId });
      const allRates = await Rate.find({
        productId: { $in: [prodId] },
      });
      const newTotal = (prod.totalRates -= exist.rate);
      const newAverage = newTotal / allRates.length - 1;
      console.log({ newTotal, allRates: allRates.length });
      await Product.findByIdAndUpdate(prodId, {
        totalRates: newTotal,
        averageRate: newAverage,
      });

      await UpdateProductRate();
    }

    if (!exist) {
      const newRate = await Rate.create({
        rate,
      });
      await Rate.findByIdAndUpdate(
        newRate._id,
        {
          $push: {
            productId: prodId,
            userId: raterId,
          },
        },
        {
          new: true,
        }
      );

      await UpdateProductRate();
    }

    // const user = await User.findOne({ _id: likerId });

    revalidatePath(`/products`);

    return {
      ok: true,
      message: `rated`,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
