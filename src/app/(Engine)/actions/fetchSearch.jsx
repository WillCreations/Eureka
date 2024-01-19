
import User from "@/app/(Engine)/models/user"
import { connectToDb } from "../mongodb/database"
 
export const fetchSearch = async (q, page) => {
    const regex = new RegExp(q, "i")

    const ITEM_PER_PAGE = 5
   
    try {
        connectToDb()
        const count = await User.find({ name: { $regex: regex } }).count()
        const user = await User.find({ name: { $regex: regex } })
            .limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1)).sort({updatedAt: -1})
        return {count, user};
    } catch (error) {
        throw new Error("Failed Search")
    }


}