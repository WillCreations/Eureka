"use client"
import {MdSearch } from "react-icons/md"
import {useSearchParams, usePathname, useRouter } from "next/navigation"

const SearchBar = ({ placeholder }) => {

    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()

 
     

    

    const handleSearch = (e) => {
        const params = new URLSearchParams(searchParams)
        if (e.target.value) {
            params.set("q", e.target.value)
        } else {
            params.delete("q")
        }
        replace(`${pathname}?${params}`)
    }


  return (
      <div className="flex-1 focus:outline-4 flex relative items-center rounded-full  bg-gray-800">
          <div  className="absolute left-3 text-xl p-2 hover:bg-gray-700 rounded-full "><MdSearch/></div> 
          <input
              className="w-full px-14 py-2 rounded-full bg-0 bg-transparent "
              type="text"
              placeholder={placeholder}
              onChange={handleSearch}
          />
    </div>
  )
}

export default SearchBar