import Pagination from "@/app/components/Pagination";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { deleteProd } from "@/app/(Engine)/actions/deleteProd";
import ProductForm from "@/app/components/ProductForm";
import { addProduct } from "@/app/(Engine)/actions/addProduct";
import SearchBar from "@/app/components/SearchBar";
import { fetchproduct } from "@/app/(Engine)/actions/fetchproduct";
import Image from "next/image";

const productList = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  console.log(q, "query");
  const { count, products } = await fetchproduct(q, page);
  const session = await getServerSession(options);
  console.log(count, "countererererer");
  if (!session?.user.admin) {
    redirect("/");
  }

  return (
    <div className="mx-10 lg:mx-28  grid grid-cols-1">
      <div className="col-span-1 my-10 md:flex-1">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className=" text-4xl py-2 font-bold  text-green-300 ">
            <h2>BroadSheet</h2>
          </div>
          <div className="mt-5 w-1/2">
            <SearchBar placeholder="Search User..." />
          </div>
        </div>

        <div className="grid-cols-12 grid gap-2 justify-between items-center my-5">
          <div className="flex col-span-3 lg:col-span-1 rounded-tl-lg rounded-bl-lg px-5 py-3 w-full bg-[#121212]  items-center">
            <div className="  text-center  w-full ">Image</div>
          </div>

          <div className=" bg-[#121212] w-full py-3 px-5 text-center capitalize   col-span-5 lg:col-span-4">
            <h1>Name</h1>
          </div>

          <div className=" capitalize bg-[#121212] w-full py-3 px-5 text-center hidden lg:block  col-span-3 lg:col-span-2">
            <h2>Category</h2>
          </div>
          <div className="capitalize bg-[#121212] w-full py-3 px-5 text-center hidden lg:block lg:col-span-2">
            <h2>Price</h2>
          </div>
          <div className=" capitalize bg-[#121212] w-full py-3 px-5 text-center hidden lg:block lg:col-span-1">
            <h2>Stock</h2>
          </div>

          <div className=" col-span-2 lg:col-span-1">
            <div className=" bg-[#121212] text-center w-full px-5 py-3 text-white">
              Action
            </div>
          </div>
          <div className=" col-span-2 lg:col-span-1">
            <div className=" rounded-tr-lg text-center rounded-br-lg bg-[#121212] w-full px-5 py-3 text-gray-300">
              Action
            </div>
          </div>
        </div>
        <div className="h-80 overflow-scroll my-5  ">
          {products.map((prod) => {
            return (
              <div
                className="grid-cols-12 grid gap-2 justify-between items-center my-2"
                key={prod._id}
              >
                <div className="col-span-3 flex items-center lg:col-span-1">
                  <div className="h-20 rounded-md overflow-hidden">
                    <Image
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
                </div>

                <div className="  w-full py-3 px-5  capitalize flex items-center  col-span-5 lg:col-span-4">
                  <h1 className="mr-5">{prod.name}</h1>
                </div>

                <div className=" capitalize  w-full py-3 px-5  items-center hidden lg:flex  col-span-3 lg:col-span-2">
                  <h2>{prod.category}</h2>
                </div>

                <div className=" capitalize w-full py-3 px-5  items-center hidden lg:flex lg:col-span-2">
                  <h2>${prod.price}</h2>
                </div>
                <div className=" capitalize w-full py-3 px-5  items-center hidden lg:flex lg:col-span-1">
                  <h2>{prod.stock} Units</h2>
                </div>
                <div className=" col-span-2 flex items-center lg:col-span-1">
                  <Link className="w-full" href={`/products/${prod._id}`}>
                    <button className="rounded-lg bg-green-300 w-full px-5 py-3 text-black">
                      View
                    </button>
                  </Link>
                </div>

                <form
                  className="flex items-center col-span-2 lg:col-span-1"
                  action={deleteProd}
                >
                  <input type="hidden" name="cloud" value={prod.destroy} />
                  <input type="hidden" name="url" value={prod.image} />
                  <input type="hidden" name="id" value={prod._id.toString()} />
                  <button className="rounded-lg bg-[#121212] w-full px-5 py-3 text-gray-300">
                    Delete
                  </button>
                </form>
              </div>
            );
          })}
        </div>

        <Pagination Count={count} />
      </div>
      <div className=" my-10 col-span-1 flex flex-col  md:flex-1">
        <div className=" text-2xl font-bold  text-green-300 ">
          Add New Product
        </div>
        <ProductForm Action={addProduct} button="Add" count={count} />
      </div>
    </div>
  );
};

export default productList;
