import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { deleteUser } from "@/app/(Engine)/actions/deleteUser";
import UserForm from "@/app/components/UserForm";
import { addUser } from "@/app/(Engine)/actions/addUser";
import SearchBar from "@/app/components/SearchBar";
import { fetchSearch } from "@/app/(Engine)/actions/fetchSearch";
import Pagination from "@/app/components/Pagination";

const UserList = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  console.log(q, "query");
  const { count, user } = await fetchSearch(q, page);
  const session = await getServerSession(options);

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
          <div className="w-1/2 mt-10">
            <SearchBar placeholder="Search User..." />
          </div>
        </div>
        <div
          className="grid-cols-12 grid gap-2 justify-between items-center my-5"
          key={user._id}
        >
          <div className="flex col-span-3 lg:col-span-1 rounded-tl-lg rounded-bl-lg px-5 py-3 w-full bg-[#121212]  items-center">
            <div className="  text-center  w-full ">Image</div>
          </div>

          <div className=" bg-[#121212] w-full py-3 px-5 text-center capitalize col-span-3 lg:col-span-1">
            <h1>Name</h1>
          </div>

          <div className=" capitalize bg-[#121212] w-full py-3 px-5 text-center hidden lg:block  col-span-6 lg:col-span-4">
            <h2>Address</h2>
          </div>
          <div className="capitalize bg-[#121212] w-full py-3 px-5 text-center hidden lg:block lg:col-span-2">
            <h2>Phone No</h2>
          </div>
          <div className=" capitalize bg-[#121212] w-full py-3 px-5 text-center hidden lg:block lg:col-span-2">
            <h2>Email</h2>
          </div>

          <div className=" col-span-3 lg:col-span-1">
            <div className=" bg-[#121212] text-center w-full px-5 py-3 text-white">
              Action
            </div>
          </div>
          <div className=" col-span-3 lg:col-span-1">
            <div className=" rounded-tr-lg text-center rounded-br-lg bg-[#121212] w-full px-5 py-3 text-gray-300">
              Action
            </div>
          </div>
        </div>
        {user.map((user) => {
          console.log("user: ", user.email);
          return (
            <div
              className="grid-cols-12 grid gap-2 justify-between items-center my-5"
              key={user._id}
            >
              <div className="flex col-span-3 lg:col-span-1  items-center">
                <div className=" w-14 h-14 flex justify-center items-center rounded-full overflow-hidden ">
                  <Image
                    src={user.picture}
                    alt={user.name}
                    style={{ objectFit: "cover" }}
                    width={200}
                    height={200}
                  />
                </div>
              </div>

              <div className="mr-5 capitalize col-span-3 lg:col-span-1">
                <h1>{user.name}</h1>
              </div>

              <div className="mr-5 capitalize hidden lg:block  col-span-6 lg:col-span-4">
                <h2>{user.address}</h2>
              </div>
              <div className="mr-5 capitalize hidden lg:block lg:col-span-2">
                <h2>{`${user.countryCode}${user.phone}`}</h2>
              </div>
              <div className="mr-5  hidden lg:block lg:col-span-2">
                <h2>{user.email}</h2>
              </div>

              <div className="  col-span-3 lg:col-span-1">
                <Link className="w-full" href={`/users/${user.email}`}>
                  <button className="rounded-lg bg-green-300 w-full px-5 py-3 text-black">
                    View
                  </button>
                </Link>
              </div>
              <form className=" col-span-3 lg:col-span-1" action={deleteUser}>
                <input type="hidden" name="url" value={user.picture} />
                <input type="hidden" name="cloud" value={user.destroy} />
                <input type="hidden" name="id" value={user._id.toString()} />
                <button className="rounded-lg bg-[#121212] w-full px-5 py-3 text-gray-300">
                  Delete
                </button>
              </form>
            </div>
          );
        })}
        <Pagination Count={count} />
      </div>
      <div className=" my-10 col-span-1 flex flex-col  md:flex-1">
        <div className=" text-2xl font-bold  text-green-300 ">
          Register New User
        </div>
        <UserForm Action={addUser} button="Add" />
      </div>
    </div>
  );
};

export default UserList;
