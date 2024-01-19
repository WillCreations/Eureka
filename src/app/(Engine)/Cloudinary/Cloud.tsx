import { v2 as cloudinary } from "cloudinary"

export const cloud = cloudinary.config({
    cloud_name: "deelyafti",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

