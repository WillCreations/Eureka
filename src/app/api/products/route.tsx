
import { NextResponse } from "next/server";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "../../(Engine)/models/productSchema"





export const GET = async () => {
    try {
      console.log(Product)
        await connectToDb();
      const cluster = await Product.find()
    return new NextResponse(JSON.stringify(cluster), {status:200})
  } catch (error) {
      return new NextResponse("Failed to fetch all Products ", {status: 500})
    }

}


