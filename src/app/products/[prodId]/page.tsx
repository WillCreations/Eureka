import Box from "@/app/components/Box";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "../../(Engine)/models/productSchema";
import Link from "next/link";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import BuyButton from "@/app/components/BuyButton";
import CompGrid from "@/app/components/CompGrid";

const ProductDetails = async ({ params }) => {
  const session = await getServerSession(options);
  await connectToDb();
  const cluster = await Product.findOne({ _id: Object(params.prodId) });

  const { _id, name, description, category, price, image, stock } = cluster;
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
    },
  ];

  const arrayone = JSON.stringify(cate);
  const transCluster = JSON.stringify(cluster);

  console.log("arrayone: ", arrayone);
  console.log("transCluster: ", transCluster);

  return (
    <div className="min-h-screen box-border m-1 lg:px-28 px-10 pb-96">
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
      <div className="flex flex-col  md:justify-between bg-[#121212] rounded-md p-10 my-5 text-black">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 md:items-start ">
          <div className=" w-full  md:col-span-1   ">
            <div className=" relative rounded-md w-full shadow-2xl overflow-hidden  ">
              <Image
                style={{ objectFit: "cover" }}
                src={image}
                alt={description}
                height={1000}
                width={1000}
              />
              <h3 className="absolute text-white bg-green-700 top-2 py-1 px-2 rounded-sm left-2 items-center">
                ${price}
              </h3>
            </div>
          </div>

          <div className="md:flex py-5 md:p-5 md:flex-col md:col-span-1 ">
            <div className="md:p-5">
              <h1 className=" text-3xl font-bold text-green-300 ">{name}</h1>
              <div className="h-28">
                <h3 className=" text-sm text-white font-thin">{description}</h3>
              </div>
            </div>

            <div className="md:p-5 text-white">
              <BuyButton prod={prime} />
            </div>
          </div>
        </div>
        <div className="flex gap-5  sm:flex-row flex-col my-5 justify-between items-center lg:items-end">
          <button className="font-bold w-full sm:w-fit text-black text-md bg-green-300 py-3 px-5 lg:mt-3 rounded-md">
            {category}
          </button>
          <div className=" w-full sm:w-fit">
            <Box prod={prime[0]} />
          </div>
        </div>
      </div>

      <CompGrid prodo={arrayone} cluster={transCluster} />
    </div>
  );
};

export default ProductDetails;
