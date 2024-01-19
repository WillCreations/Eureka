import { NextResponse } from "next/server";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "../../../(Engine)/models/productSchema";




async function fetchProducts() {
    await connectToDb();
    const response = await Product.find()
    return response;
}


export async function GET(request) {
    const products = await fetchProducts();
    const { searchParams } = new URL(request.url)
    console.log(searchParams)
    const query = searchParams.get("category");
    const filtered = products.filter((prod) => {
        return prod.category.toLowerCase().includes(query.toLowerCase())
    })
    return new NextResponse(JSON.stringify(filtered))

}