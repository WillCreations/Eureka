import Client from "@/app/(Engine)/models/clientSchema";
import { connectToDb } from "../mongodb/database";

export const fetchClient = async () => {
  //   const regex = new RegExp(q, "i");
  //   console.log({ q, page });
  //   const ITEM_PER_PAGE = 5;

  //   try {
  //     connectToDb();
  //     const count = await Client.find({ name: { $regex: regex } }).count();
  //     const clients = await Client.find({ name: { $regex: regex } })
  //       .limit(ITEM_PER_PAGE)
  //       .skip(ITEM_PER_PAGE * (page - 1))
  //       .sort({ createdAt: -1 });
  //     console.log(count, "countererre in server");
  //     return { count, clients };
  //   } catch (error) {
  //     throw new Error("Failed Search");
  //   }
  try {
    connectToDb();

    const clients = await Client.find().sort({ createdAt: -1 });
    console.log({ count: clients.length });

    return { clients };
  } catch (error) {
    throw new Error("Failed Search");
  }
};
