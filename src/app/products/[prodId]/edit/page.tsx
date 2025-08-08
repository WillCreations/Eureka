import { updateProduct } from "@/app/(Engine)/actions/updateProduct";
import EditForm from "@/app/components/EditForm";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "@/app/(Engine)/models/productSchema";
import { fetchCategory } from "@/app/(Engine)/actions/fetchCategory";
import { convertDbObj } from "@/app/(Engine)/utils/utility";
import { deleteImage } from "@/app/(Engine)/actions/deleteImage";

const update = async ({ params }) => {
  console.log(params.prodId, "hello");

  connectToDb();
  const ObjectIdString = await Product.findById(params.prodId);

  const parsed = convertDbObj(ObjectIdString);

  const result = await fetchCategory();
  const cateee = convertDbObj(result);

  return (
    <EditForm
      deleteImage={deleteImage}
      Updater={updateProduct}
      Prod={parsed}
      cate={cateee}
    />
  );
};

export default update;
