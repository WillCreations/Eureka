import { updateProduct } from "@/app/(Engine)/actions/updateProduct";
import EditForm from "@/app/components/EditForm";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "@/app/(Engine)/models/productSchema";

const update = async ({ params }) => {
  console.log(params.prodId, "hello");

  connectToDb();
  const ObjectIdString = await Product.findById(params.prodId);
  const JsonStringObj = JSON.stringify(ObjectIdString);
  const parsed = JSON.parse(JsonStringObj);
  console.log({ parsed }, { ObjectIdString }, { JsonStringObj });

  return <EditForm Updater={updateProduct} Prod={parsed} />;
};

export default update;
