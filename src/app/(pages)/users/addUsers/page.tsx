import UserForm from "@/app/components/UserForm"
import { addUser } from "@/app/(Engine)/actions/addUser"

const addUsers = () => {
  return (
    <div>addUser
          <UserForm
            Action={addUser}
          />
    </div>
  )
}

export default addUsers
