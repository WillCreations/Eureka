
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import User from "@/app/(Engine)/models/user";
import { NextResponse } from "next/server";



export async function GET( request ) {
    const {searchParams} = new URL(request.url)
    const username = searchParams.get("search")
    await connectToDb()
    const user = await User.findOne({ name: username })
    return new NextResponse(JSON.stringify(user))
    
}
