import User from "@/app/(Engine)/models/user";
import { connectToDb } from "@/app/(Engine)/mongodb/database";

export const fetchUserDetails = async (email: String) => {
  "use server";
  try {
    connectToDb();
    const user = await User.findOne({ email });

    if (user) {
      console.log({ userId: user._id });
      return JSON.stringify(user);
    }
  } catch (error) {
    console.log(error.message);
  }
};
