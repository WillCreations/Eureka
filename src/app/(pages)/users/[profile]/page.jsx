import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import User from "@/app/(Engine)/models/user";
import Image from "next/image";
import ImageForm from "@/app/components/ImageForm";
import { uploader } from "@/app/(Engine)/actions/uploader";

const Profile = async ({ params }) => {
  await connectToDb();

  const newEmail = params.profile.replace("%40", "@");

  const cluster = await User.findOne({ email: newEmail });

  const { name, _id, email, address, picture, phone, admin } = cluster;

  const session = await getServerSession(options);
  console.log(session, "session in user details page");

  return (
    <div className="mx-10 min-h-screen text-white">
      <div className="flex justify-between items-center rounded-md text-xl py-2 bg-gray-800 text-white px-10">
        <p>Profile</p>
      </div>
      <div>
        <h1 className="mt-10 text-5xl">
          {" "}
          {session?.user.name === params.profile
            ? "Hello! " + session?.user.name
            : name + "'s profile"}
        </h1>
      </div>

      <div className="flex py-5 items-end ">
        <div className="relative  rounded-md w-[300px] overflow-hidden h-[300px]  mr-5">
          <Image
            className="object-cover w-full h-full"
            src={picture}
            alt={name}
            width="500"
            height="500"
          />
          {admin ? (
            <h3 className="bg-white font-bold absolute s bottom-5 left-5 px-3 py-1 rounded-md inline text-green-500 shadow-md">
              admin
            </h3>
          ) : (
            ""
          )}
        </div>
        <div>
          <h2>Details</h2>
          <div className=" font-light text-green-700">
            Email: <span className="text-2xl text-blue-200">{email}</span>
          </div>
          <div className=" font-light text-green-700">
            Phone No: <span className="text-2xl text-blue-200">{phone}</span>{" "}
          </div>
          <div className=" font-light text-green-700">
            Serial No:{" "}
            <span className="text-2xl text-blue-200">
              #{_id.toString().slice(0, 5)}
            </span>
          </div>
          <div className=" font-light text-green-700">
            Address: <span className="text-2xl text-blue-200">{address}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div>
          <Link href={`/users/${session?.user.name}/${_id.toString()}`}>
            <button className="btn btn-outline px-5 mr-2 my-5">Edit</button>
          </Link>
        </div>
        {admin && (
          <div>
            <div className="flex justify-between items-center ">
              <Link href="/users">
                <button className="bg-blue-300 transition-all font-bold text-black active:scale-95 px-5 py-3 rounded-md mx-2 my-5">
                  Users
                </button>
              </Link>
              <Link href="/product_panel">
                <button className="bg-blue-300 transition-all font-bold text-black active:scale-95 px-5 py-3 rounded-md mx-2 my-5">
                  Add Product
                </button>
              </Link>
            </div>
            <div className="hidden">
              <ImageForm up={uploader} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
