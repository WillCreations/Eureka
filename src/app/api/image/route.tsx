import { writeFile } from "fs/promises"
import { join } from "path"
import path from "path"
import { NextResponse } from "next/server"



export async function POST(request) {

    if (request.method === 'POST') {
        const body = await request.formData()
        const image = body.get("image")
        console.log(image, "gbe bodie")
        console.log(request.file, "Files straight up")
        const newName = "avatar/" + Date.now() + path.extname(image.name)
        const pathname = join("public", newName)

        const imagebyte = await image.arrayBuffer() 
        console.log(imagebyte, "imagebyte")
        const buffer = Buffer.from(imagebyte)
        console.log(buffer, " buffer")
        await writeFile(pathname, buffer)

        console.log(pathname, "path of upload")
        return new NextResponse( buffer, { status: 200 })

    }
}

