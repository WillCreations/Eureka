import { Schema, model, models } from "mongoose"


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "is required"],
    },
    description: {
        type: String,
        required: [true, "email is required"],
    },

    price: {
        type: Number,
        required: [true, "password is required"]
    },

    category: {
        type: String,
        required: [true, "product category"],
        enum: ["Clothing", "Beauty", "Kitchen", "Phone", "Electronics"]
    },

    image: {
        type: String,
        required: [true, " product image"]
    },

    alt_image: {
        type: String,
        required: [true, 'alternative image']
    },
    
    destroy: {
        type: String,
        required: [true, 'destroy image']
    },

    slug: {
        type: String,
        required: [true, "product slug"]
    },

    stock: {
        type: Number,
        required:[true, "product unit"]
    }
    
}, { timestamps: true })

console.log("Hey prod Schema");

const Product = models.Products || model("Products", ProductSchema);

export default Product;