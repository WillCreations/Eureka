import { updateUser } from "@/app/(Engine)/actions/updateUser";
import User from "@/app/(Engine)/models/user";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import UserEdit from "@/app/components/UserEdit";
import { deleteImage } from "@/app/(Engine)/actions/deleteImage";
import { convertDbObj } from "@/app/(Engine)/utils/utility";

const update = async ({ params }) => {
  console.log(params.update, "hello");
  connectToDb();
  const ObjectIdString = await User.findOne({ _id: Object(params.update) });
  const parsed = convertDbObj(ObjectIdString);
  return (
    <UserEdit Updater={updateUser} Use={parsed} deleteImage={deleteImage} />
  );
};

export default update;
