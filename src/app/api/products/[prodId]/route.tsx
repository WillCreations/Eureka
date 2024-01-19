import { NextResponse } from "next/server";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "../../../(Engine)/models/productSchema"




export const GET = async ({params}) => {
  
      console.log(params.prodId, "paramram")
        await connectToDb();
        const cluster = await Product.findOne({ _id: Object(params.prodId) })
        console.log(cluster)
    return new NextResponse(JSON.stringify(cluster))

}