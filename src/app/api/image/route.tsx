import multer from "multer"
import path from "path"
import { NextResponse } from "next/server"

const storage = multer.diskStorage({
    destination: (request, cb) => {
        cb(null, "public") 
    },

    filename: (request, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage })

export async function POST(request) {
    console.log(request, " reques sta sta sta ")
    if (request.method === 'POST') {
        const body= await request.json()
        console.log(body, "gbe bodie")
        upload.single("image")(request, (err) => {
            if (err) {
                return new NextResponse("failed to upload", { status: 500 })
            }
            return new NextResponse(JSON.stringify({ file: request.file }), { status: 200 })
        

    
        })
    }
}

