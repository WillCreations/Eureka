import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import User from "@/app/(Engine)/models/user";
import Image from "next/image";
import ImageForm from "@/app/components/ImageForm";
import { uploader } from "@/app/(Engine)/actions/uploader";
import { CountryCoder } from "@/CountryCodes";

const Profile = async ({ params }) => {
  await connectToDb();

  const newEmail = params.profile.replace("%40", "@");

  const cluster = await User.findOne({ email: newEmail });

  const { name, _id, email, address, picture, countryCode, phone, admin } =
    cluster;

  const session = await getServerSession(options);
  console.log(session, "session in user details page");

  return (
    <div className="mx-10 lg:mx-28 min-h-screen text-white">
      <div className=" text-4xl py-5 font-bold  text-green-300 ">
        <p>Profile</p>
      </div>
      <div className="bg-[#121212] p-5 text-gray-400 rounded-lg">
        <div className=" grid grid-cols-1 md:grid-cols-5 gap-5 py-5  ">
          <div className="relative col-span-2 w-full  rounded-md  overflow-hidden h-[300px]  ">
            <Image
              className="object-contain bg-black w-full h-full"
              src={picture ? picture : "/personHead.svg"}
              alt={name}
              width="500"
              height="500"
            />
            {admin ? (
              <h3 className="bg-white font-bold absolute s bottom-5 left-5 px-3 py-1 rounded-md inline text-green-500 shadow-md">
                admin
              </h3>
            ) : null}
          </div>
          <div className="flex col-span-3 flex-col gap-5 justify-between">
            <div className="text-center">
              <h1 className="mt-10 capitalize text-green-300 font-bold text-5xl">
                {" "}
                {session?.user.email === newEmail
                  ? "Hello! " + name
                  : name + "'s profile"}
              </h1>
            </div>
            <div className="w-full">
              <div className=" font-light text-xl flex justify-between w-full text-green-300">
                <div>Email: </div>
                <div>
                  <span className="text-xl text-blue-200">{email}</span>
                </div>
              </div>
              <div className=" font-light text-xl flex justify-between w-full text-green-300">
                <div>Phone No:</div>{" "}
                <div>
                  <span className="text-xl text-blue-200">
                    {`${countryCode}${phone}`}
                  </span>
                </div>
              </div>
              <div className=" font-light text-xl flex justify-between w-full text-green-300">
                <div>Address:</div>{" "}
                <div>
                  <span className="text-xl text-blue-200">{address}</span>
                </div>
              </div>
              <div className=" font-light text-xl flex justify-between w-full text-green-300">
                <div>Contact Nationality:</div>{" "}
                <div>
                  <span className="text-xl text-blue-200">
                    {CountryCoder(countryCode)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-5 items-center justify-between">
          <div className="col-span-3 md:col-span-2">
            {admin && (
              <div>
                <div className="flex gap-5  justify-between items-center ">
                  <Link href="/users">
                    <button className="rounded-lg bg-green-300 text-black font-medium py-3 px-5">
                      Users Log
                    </button>
                  </Link>
                  <Link href="/product_panel">
                    <button className="rounded-lg bg-green-300 text-black font-medium py-3 px-5">
                      Product Log
                    </button>
                  </Link>
                </div>
                <div className="hidden">
                  <ImageForm up={uploader} />
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2 md:col-span-3 flex justify-end">
            <Link href={`/users/${session?.user.name}/${_id.toString()}`}>
              <button className="rounded-lg bg-green-300 text-black font-medium py-3 px-5 my-5">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
