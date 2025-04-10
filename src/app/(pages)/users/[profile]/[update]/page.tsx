import { updateUser } from "@/app/(Engine)/actions/updateUser";
import User from "@/app/(Engine)/models/user";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import UserEdit from "@/app/components/UserEdit";

const update = async ({ params }) => {
  console.log(params.update, "hello");
  connectToDb();
  const ObjectIdString = await User.findOne({ _id: Object(params.update) });
  const JsonStringObj = JSON.stringify(ObjectIdString);
  const parsed = JSON.parse(JsonStringObj);
  return <UserEdit Updater={updateUser} Use={parsed} />;
};

export default update;
