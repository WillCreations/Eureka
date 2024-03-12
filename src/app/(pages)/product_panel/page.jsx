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
  if (session?.user.email !== "admin@gmail.com") {
    redirect("/");
  }

  return (
    <div className="mx-10  flex flex-col gap-10 md:flex-row">
      <div className=" my-10 md:flex-1 px-10 md:px-0">
        <div className="flex flex-col ">
          <div className="flex justify-between items-center rounded-md text-xl py-2 bg-white text-green-950 px-10">
            <h2>List of Products</h2>
          </div>
          <div className="mt-5 w-1/2">
            <SearchBar placeholder="Search User..." />
          </div>
        </div>
        <div className="h-80 overflow-scroll my-10 pr-3 ">
          {products.map((prod) => {
            return (
              <div
                className="flex justify-between p-2 rounded-md hover:bg-gray-900 items-center my-2"
                key={prod._id}
              >
                <div className="flex mr-5 items-center">
                  <div className="mr-3 rounded-md overflow-hidden">
                    <Image
                      style={{ objectFit: "cover" }}
                      width={50}
                      height={50}
                      objectFit="cover"
                      src={prod.alt_image ? prod.alt_image : prod.image}
                      alt={prod.description}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={
                        prod.alt_image ? prod.alt_image : "/avatar/avatar.svg"
                      }
                    />
                  </div>
                  <Link href={`/products/${prod._id}`}>
                    <h1 className="mr-5">{prod.name}</h1>
                  </Link>
                  <h2>{prod.category}</h2>
                </div>
                <form action={deleteProd}>
                  <input type="hidden" name="url" value={prod.image} />
                  <input type="hidden" name="id" value={prod._id.toString()} />
                  <button className="btn btn-warning">Delete</button>
                </form>
              </div>
            );
          })}
        </div>

        <Pagination Count={count} />
      </div>
      <div className="mx-10 md:mx-0 my-10 flex flex-col  md:flex-1">
        <div className="flex justify-between items-center rounded-md text-xl py-2 bg-white text-green-950 px-10">
          Add New Product
        </div>
        <ProductForm Action={addProduct} button="Add" count={count} />
      </div>
    </div>
  );
};

export default productList;
