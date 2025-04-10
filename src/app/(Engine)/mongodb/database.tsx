import mongoose from "mongoose";

let isConnected = false;
export const connectToDb = async () => {
  const { LOCAL_MONGODB_URI, REMOTE_MONGODB_URI, MONGODB_URI, NODE_ENV } =
    process.env;
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongodb is connected");
    return;
  }

  try {
    const connector = async (url) => {
      await mongoose.connect(url, {
        dbName: "Bank",
      });
      isConnected = true;
    };

    if (NODE_ENV === "development") {
      await connector(LOCAL_MONGODB_URI);
      console.log(isConnected, "Mongodb just connected locally");
    }
    if (NODE_ENV === "production") {
      await connector(REMOTE_MONGODB_URI);
      console.log(isConnected, "Mongodb just connected remotely");
    }
  } catch (error) {
    console.log(error);
  }
};
