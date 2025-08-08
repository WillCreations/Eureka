import Box from "@/app/components/Box";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "../../(Engine)/models/productSchema";
import Link from "next/link";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import BuyButton from "@/app/components/BuyButton";
import CompGrid from "@/app/components/CompGrid";
import Rater from "@/app/components/Rater";
import { rateProduct } from "@/app/(Engine)/actions/rateProduct";
import { updateStock } from "@/app/(Engine)/actions/updateStock";

import { checkLike } from "@/app/(Engine)/actions/checkLike";
import { unlikeProduct } from "@/app/(Engine)/actions/unlikeProduct";
import { fetchProductLikes } from "@/app/(Engine)/actions/fetchProductLikes";
import { likeProduct } from "@/app/(Engine)/actions/likeProduct";

export const metadata = {
  title: "Product Page",
};
const actions = {
  checkLike,
  unlikeProduct,
  likeProduct,
  fetchProductLikes,
};

const ProductDetails = async ({ params }) => {
  const session = await getServerSession(options);
  await connectToDb();
  const cluster = await Product.findOne({ _id: Object(params.prodId) });

  const {
    _id,
    name,
    description,
    category,
    price,
    image,
    stock,
    count,
    averageRate,
  } = cluster;
  const cate = await Product.find({ category: category });
  const catego = cate.filter((cat) => {
    return cat._id !== _id;
  });
  console.log("thiscate: ", catego.length);
  console.log("products in this category: ", cate.length);
  const prime = [
    {
      _id: _id.toString(),
      name,
      description,
      category,
      price,
      image,
      stock,
      count,
      averageRate,
    },
  ];

  const arrayone = JSON.stringify(cate);
  const transCluster = JSON.stringify(cluster);

  console.log("arrayone: ", arrayone);
  console.log("transCluster: ", transCluster);

  return (
    <div className="min-h-screen box-border m-1 lg:px-28 xxs:px-10 px-5 pb-96">
      <div className="flex justify-between items-center rounded-md py-2  ">
        <h2 className="text-4xl text-green-300 font-bold">Product Details</h2>
        <div>
          {session?.user.admin && (
            <Link href={`/products/${params.prodId}/edit`}>
              <button className=" text-sm  bg-[#121212] py-3 px-5  text-gray-300 rounded-lg">
                Edit
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col  md:justify-between bg-[#121212] rounded-md p-5 xxs:p-10 my-5 text-black">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 md:items-start ">
          <div className=" w-full  md:col-span-1   ">
            <div className=" relative rounded-md w-full shadow-2xl overflow-hidden max-h-[650px] ">
              <Image
                style={{ objectFit: "cover" }}
                className="w-full min-h-full"
                src={image}
                alt={description}
                height={1000}
                width={1000}
              />
              <h3 className="absolute text-green-300  shadow-md font-extrabold bg-[#121212]  rounded-md top-1 left-1 px-5 py-2">
                ${price}
              </h3>
            </div>
          </div>

          <div
            className="md:flex gap-5 md:flex-col md:justify-between
           md:col-span-1 h-full "
          >
            <div className="">
              <h1 className=" text-4xl font-bold text-green-300 ">{name}</h1>
              <div className="h-28 my-5">
                <h3 className=" text-sm text-white font-thin">{description}</h3>
              </div>
              <Rater prod={prime[0]} Action={rateProduct} />
            </div>

            <div className=" text-white">
              <BuyButton prod={prime} updateStock={updateStock} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5  sm:flex-row flex-col mt-5 justify-between items-center lg:items-end">
          <div className="col-span-1">
            <div className="font-bold  w-full text-center text-black text-md bg-green-300 py-5 px-5  rounded-md">
              {category}
            </div>
          </div>
          <div className=" col-span-1 ">
            <Box prod={prime[0]} updateStock={updateStock} />
          </div>
        </div>
      </div>

      <CompGrid updateStock={updateStock} prodo={arrayone} cluster={transCluster} actions={actions} />
    </div>
  );
};

export default ProductDetails;
