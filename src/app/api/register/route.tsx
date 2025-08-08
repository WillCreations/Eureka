import { connectToDb } from "@/app/(Engine)/mongodb/database";
import User from "@/app/(Engine)/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    connectToDb();

    const body = await request.json();
    const { name, email, password } = body.data;
    console.log({body});

    if (!name || !email || !password) {
      throw new Error("missing name, email, password");
    }

    const userExists = await User.findOne({
      email,
    });

    if (!userExists) {
      console.log("user doesn't exist oh, creating one");
      const hashedPassword = await bcrypt.hash(password, 10);

      const newuser = await User.create({
        name,
        email,
        password: hashedPassword,
        admin: false,
      });
      console.log(newuser, "newuser");
      return new NextResponse(
        JSON.stringify({
          message: `${newuser.name} registered successfully`,
        })
      );
    } else {
      console.log(userExists.email);
      throw new Error("Email already exists");
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),
      {
        status: 500,
      }
    );
  }
}
