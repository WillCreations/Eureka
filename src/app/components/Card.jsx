import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BsHeartFill } from "react-icons/bs";
import { FaHeartbeat } from "react-icons/fa";
import { FaHeart, FaStar } from "react-icons/fa6";
import {
  IoHeart,
  IoHeartDislike,
  IoHeartDislikeOutline,
  IoHeartOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import Like from "@/app/components/Like";
import Rating from "@/app/components/Rating";

const Card = ({
  prod,
  children,
  checkerAction,
  likerAction,
  dislikerAction,
  likesfetchAction,
}) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const Checker = async () => {
      const response = await checkerAction(prod._id, session?.user.id);
      if (response.ok) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    if (session) {
      Checker();
    }
  }, []);

  useEffect(() => {
    const Likefetch = async () => {
      const response = await likesfetchAction(prod._id);
      if (response.ok) {
        setLikes(response.message);
      }
    };

    Likefetch();
  }, [isLiked]);

  const funct = async () => {
    if (session) {
      if (!isLiked) {
        const response = await likerAction(prod._id, session?.user.id);
        if (response.ok) {
          setIsLiked(true);
        }
      } else {
        const response = await dislikerAction(prod._id, session?.user.id);
        if (response.ok) {
          setIsLiked(false);
        }
      }
    }
  };

  return (
    <div
      className="bg-[#121212] w-full rounded-2xl overflow-hidden "
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
        <div className="absolute text-green-300  shadow-md font-extrabold bg-[#121212]  rounded-xl top-1 left-1 px-5 py-2">
          ${prod.price}
        </div>
        <Like liked={isLiked} setLiked={funct} likes={likes} />
      </div>
      <div className="flex text-gray-300 flex-col p-5">
        <div>
          <h2 className="text-2xl font-bold">{prod.name.slice(0, 15)}</h2>
          <h2>{prod.category}</h2>
          <div className="flex items-center gap-1 my-1">
            {prod.averageRate
              ? [...Array(5)].map((_, index) => {
                  return (
                    <Rating
                      key={index}
                      rate={index + 1 <= prod.averageRate ? true : false}
                    />
                  );
                })
              : [...Array(5)].map((_, index) => {
                  return <Rating key={index} rate={false} />;
                })}
          </div>
        </div>

        <div className="flex justify-end mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Card;
