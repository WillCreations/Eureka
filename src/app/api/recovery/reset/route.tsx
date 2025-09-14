import { connectToDb } from "@/app/(Engine)/mongodb/database";
import User from "@/app/(Engine)/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("search");
    console.log(email, "search email");
    await connectToDb();
    const user = await User.findOne({ email: email });

    console.log(user, "user in endpoint");
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "user not found" }), {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { email, password, password2 } = await body;
    console.log(email, password, password2, "body data");
    if (password !== password2) {
      throw new Error("passwords don't match");
    }

    const hash = await bcrypt.hash(password, 10);

    console.log(hash, "new hashed password");

    await connectToDb();
    const userObject = await User.findOne({ email: email });
    if (!userObject) {
      throw new Error("user not found");
    }
    console.log(userObject, "user object");
    const user = await User.findByIdAndUpdate(userObject._id, {
      password: hash,
    });
    console.log(user, "user in endpoint");
    return new NextResponse(
      JSON.stringify({ message: `${user.name} changed password successfully` }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
