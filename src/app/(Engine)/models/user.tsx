
import { Schema, model, models } from "mongoose"


const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
    },
    name: {
        type: String,
        required: [true, "email is required"],
    },

    password: {
        type: String,
        required: [true, "password is required"]
    },
     
    admin: {
        type: Boolean,
        required:[true, "Admin is required"]
    },

    picture: {
        type: String,
    },

    image: {
       type: String, 
    },

    phone: {
        type: String,

    },

    address: {
        type: String,
    }

}, { timestamps: true } );


const User = models.Users || model("Users", UserSchema);
console.log(`userSchema hooked`);
export default User;