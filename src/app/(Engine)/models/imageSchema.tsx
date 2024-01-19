import { Schema, model, models } from "mongoose"

const ImageSchema = new Schema({
    name: {
        type: String,
        required: [true, "is required"],
    },

    image: {
        data: Buffer,
        contentType: String,
    }

}, { timestamps: true })


const Image = models.Images || model("Images", ImageSchema)

export default Image;

