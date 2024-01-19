
import Image from "next/image"
import Link from "next/link"; 
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import { deleteUser } from "@/app/(Engine)/actions/deleteUser"
import UserForm from "@/app/components/UserForm"
import { addUser } from "@/app/(Engine)/actions/addUser"
import SearchBar from "@/app/components/SearchBar"
import { fetchSearch } from '@/app/(Engine)/actions/fetchSearch'
import Pagination from "@/app/components/Pagination";



const UserList = async ({ searchParams }) => {
    const q = searchParams?.q || ""
    const page = searchParams?.page || 1
    console.log(q, "query")
    const {count, user} = await fetchSearch(q, page)
    const session = await getServerSession(options)
    
    if (session?.user.email !== "admin@gmail.com") {
        redirect("/")
    }

    return (
        <div className='mx-10 py-32 flex flex-col md:flex-row'>
            <div className='mx-10 my-10 md:flex-1'>
                <div className="flex justify-between items-center">
                    <h2>List of Users</h2>
                    <div className="w-50">
                        <SearchBar placeholder="Search User..."/> 
                    </div>
                </div>
                {user.map((user) => {
                   
                    return (<div className="flex justify-between items-center my-5" key={user._id}>
                        <div className='flex mr-5 items-center'>
                            <div className=" mr-5 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                                <Image
                                    src={user.picture}
                                    alt={user.name}
                                    object-fit="cover"
                                    width={50}
                                    height={25}
                                />
                            </div>
                           
                            <h1 className='mr-5'>{user.name}</h1>
                            
                            <h2>{user.address}</h2>
                        </div>
                         <div className="flex">
                             <Link href={`/users/${user.name}`}>
                                <button className="btn btn-info mr-2">View</button>
                                                     </Link>
                                                     <form action={deleteUser}>
                                <input type="hidden" name="id" value={user._id.toString()}/>
                                <button className="btn btn-warning">Delete</button>
                                                     </form>
                         </div>
                    </div>)
                    }
                )}
                <Pagination Count={count } /> 
            </div>
            <div className='mx-10 my-10 flex flex-col  md:flex-1'>
                <div>
                    Add New User
                </div>
                <UserForm
                    Action={addUser}
                    button="Add"
                />
            </div>
        </div>
      
    )
}

export default UserList;

   
       