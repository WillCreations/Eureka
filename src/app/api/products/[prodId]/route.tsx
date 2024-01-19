import { NextResponse } from "next/server";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "../../../(Engine)/models/productSchema"




export const GET = async (Request,) => {
  const pram = Request.params
  console.log(pram, "params")
  console.log(pram.prodId, "paramram")
        await connectToDb();
        const cluster = await Product.findOne({ _id: Object(pram.prodId) })
        console.log(cluster)
    return new NextResponse(JSON.stringify(cluster))

}