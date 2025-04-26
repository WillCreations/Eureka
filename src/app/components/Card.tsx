import Image from "next/image";
import Link from "next/link";

const Card = ({ prod, children }) => {
  return (
    <div
      className="bg-[#121212] w-full rounded-lg overflow-hidden "
      key={prod._id}
    >
      <div className="w-full h-[250px] bg-white relative overflow-hidden">
        <Link href={`/products/${prod._id}`}>
          <Image
            style={{ objectFit: "cover" }}
            className="transition-transform hover:scale-110  "
            src={prod.alt_image ? prod.alt_image : prod.image}
            alt={prod.description}
            width={500}
            height={500}
            loading="lazy"
            placeholder="blur"
            blurDataURL={prod.alt_image ? prod.alt_image : "/avatar/avatar.svg"}
          />
        </Link>
        <div className="absolute text-green-300  shadow-md font-extrabold bg-[#121212]  rounded-md top-1 left-1 px-5 py-2">
          ${prod.price}
        </div>
      </div>
      <div className="flex text-gray-300 flex-col p-5">
        <div>
          <h2 className="text-2xl font-bold">{prod.name.slice(0, 15)}</h2>
          <h2>{prod.category}</h2>
        </div>

        <div className="flex justify-end mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Card;
