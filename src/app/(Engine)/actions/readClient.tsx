import Client from "../models/clientSchema";

export const readClient = async (id) => {
  "use server";
  await Client.findByIdAndUpdate(id, { read: true });
};
