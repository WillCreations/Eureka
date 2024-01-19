
import { updateUser } from "@/app/(Engine)/actions/updateUser"
import User from "@/app/(Engine)/models/user"
import { connectToDb } from "@/app/(Engine)/mongodb/database"
import UserEdit from "@/app/components/UserEdit"



const update = async ({ params }) => {
    console.log(params.update, "hello")
    connectToDb()
    const cluster = await User.findOne({ _id: Object(params.update) })
    const {_id, name, email, address, phone, picture, password } = cluster
    const user = {
        id: _id.toString(),
        name,
        email,
        address,
        phone,
        picture,
        password
    }
    return (
        <UserEdit
            parameter={params.update}
            Updater={updateUser}
            Use={user}
        />
    )
}
  
export default update 