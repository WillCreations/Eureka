import Pagination from "@/app/components/Pagination";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { deleteProd } from "@/app/(Engine)/actions/deleteProd";
import ProductForm from "@/app/components/ProductForm";
import { addProduct } from "@/app/(Engine)/actions/addProduct";
import SearchBar from "@/app/components/SearchBar";
import DeleteForm from "@/app/components/DeleteForm";
import { fetchproduct } from "@/app/(Engine)/actions/fetchproduct";
import Image from "next/image";
import { addCategory } from "@/app/(Engine)/actions/addCategory";
import { fetchCategory } from "@/app/(Engine)/actions/fetchCategory";
import { div } from "framer-motion/client";
import SubHeader from "@/app/components/SubHeader";
import CategoryForm from "@/app/components/CategoryForm";
import { convertDbObj } from "@/app/(Engine)/utils/utility";
import DeleteButton from "@/app/components/DeleteButton";
import { deleteCategory } from "@/app/(Engine)/actions/deleteCategory";

const productList = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  console.log(q, "query");
  const { count, products } = await fetchproduct(q, page);

  const ProductArray = convertDbObj(products);
  const session = await getServerSession(options);
  console.log(count, "countererererer");
  if (!session?.user.admin) {
    redirect("/");
  }
  const result = await fetchCategory();
  const cateee = convertDbObj(result);

  console.log({ cateee });

  return (
    <div className="mx-5 xxs:mx-10 lg:mx-28  grid grid-cols-1">
      <div className="col-span-1 my-10 md:flex-1">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className=" text-4xl py-2 font-bold  text-green-300 ">
            <h2>BroadSheet</h2>
          </div>
          <div className="mt-5 w-full md:w-1/2">
            <SearchBar placeholder="Search User..." />
          </div>
        </div>

        <div className="grid-cols-12 grid gap-2 justify-between items-center my-5">
          <div className="flex col-span-3 lg:col-span-1 rounded-tl-lg rounded-bl-lg px-5 py-3 w-full bg-[#121212]  items-center">
            <div className="  text-center  w-full ">Image</div>
          </div>

          <div className=" bg-[#121212] w-full py-3 xxs:px-5 text-center capitalize   col-span-3 lg:col-span-4">
            <h1>Name</h1>
          </div>

          <div className=" capitalize bg-[#121212] w-full py-3 xxs:px-5 text-center hidden lg:block  col-span-3 lg:col-span-2">
            <h2>Category</h2>
          </div>
          <div className="capitalize bg-[#121212] w-full py-3 px-5 text-center hidden lg:block lg:col-span-2">
            <h2>Price</h2>
          </div>
          <div className=" capitalize bg-[#121212] w-full py-3 px-5 text-center hidden lg:block lg:col-span-1">
            <h2>Stock</h2>
          </div>

          <div className=" col-span-3 lg:col-span-1">
            <div className=" bg-[#121212] text-center w-full xxs:px-5 py-3 text-white">
              Action
            </div>
          </div>
          <div className=" col-span-3 lg:col-span-1">
            <div className=" rounded-tr-lg text-center rounded-br-lg bg-[#121212] w-full xxs:px-5 py-3 text-gray-300">
              Action
            </div>
          </div>
        </div>
        <div className="h-80 overflow-scroll my-5  ">
          {ProductArray.map((prod) => {
            return (
              <div
                className="grid-cols-12 grid gap-2 justify-between items-center my-2"
                key={prod._id}
              >
                <div className="col-span-3 relative flex items-center lg:col-span-1">
                  <div className="h-20 w-full bg-[#121212] rounded-md overflow-hidden">
                    <Image
                      className="h-full "
                      width={200}
                      height={200}
                      style={{ objectFit: "cover" }}
                      src={prod.alt_image ? prod.alt_image : prod.image}
                      alt={prod.description}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={
                        prod.alt_image ? prod.alt_image : "/avatar/avatar.svg"
                      }
                    />
                  </div>
                  {!prod.stock && <div className="bg-red-700  rounded-xl absolute bottom-1 right-1  px-5 py-2 lg:hidden  "> <span className="">Re-Stock</span></div> }
                </div>

                <div className="  w-full py-3 xxs:px-5  capitalize flex items-center justify-between  col-span-3 lg:col-span-4">
                  <h1 className="mr-5">{prod?.name}</h1> {!prod.stock && <div className="bg-red-700  rounded-full  px-5 py-2 hidden lg:block "> <span className="">Re-Stock</span></div> }
                </div>

                <div className=" capitalize  w-full py-3 px-5  items-center hidden lg:flex  col-span-3 lg:col-span-2">
                  <h2>{prod?.category}</h2>
                </div>

                <div className=" capitalize w-full py-3 px-5  items-center hidden lg:flex lg:col-span-2">
                  <h2>${prod?.price}</h2>
                </div>
                <div className=" capitalize w-full py-3 px-5  items-center hidden lg:flex lg:col-span-1">
                  <h2>{prod?.stock} Units</h2>
                </div>
                <div className=" col-span-3 flex items-center lg:col-span-1">
                  <Link className="w-full" href={`/products/${prod?._id}`}>
                    <button className="rounded-lg bg-green-300 w-full xxs:px-5 py-3 text-black">
                      View
                    </button>
                  </Link>
                </div>

                <DeleteForm item={prod} Action={deleteProd} />
              </div>
            );
          })}
        </div>

        <Pagination Count={count} />
      </div>
      <SubHeader tag="Add category" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        <CategoryForm Action={addCategory} />

        <div className="col-span-1 overflow-auto border-2 border-[#121212] border-solid p-5 sm:p-10 rounded-2xl h-[250px]">
          <div className="overflow-auto grid gap-2 grid-cols-2  sm:grid-cols-3 md:grid-cols-5">
            {cateee &&
              cateee?.map((c, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-xl text-center  bg-green-300 p-3  text-black "
                  >
                    <div className="flex gap-1 justify-between text-sm items-center">
                      <div>{c.category}</div>
                      <DeleteButton cate={c} Action={deleteCategory} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className=" my-10 col-span-1 flex flex-col  md:flex-1">
        <div className=" text-2xl font-bold  text-green-300 ">
          Add New Product
        </div>
        <ProductForm
          Action={addProduct}
          button="Add"
          count={count}
          category={cateee}
        />
      </div>
    </div>
  );
};

export default productList;
