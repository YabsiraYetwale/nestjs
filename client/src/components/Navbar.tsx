"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { HandMetal, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/redux/actions/auth";
import { CardContent } from "./Card";
import { useRouter, usePathname } from "next/navigation";

type userProps = {
  username: string;
};
const Navbar = () => {
  const [user, setUser] = useState<userProps | null>(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCurrentUser());
        setUser(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [pathname, dispatch]);

  const handleLogout = () => {
    setIsPopUp(false);
    dispatch<any>(localStorage.clear(), router.push("/sign-in"));
  };

  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-20 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex gap-2 items-center text-blue-500 ">
          <h1 className="3xl font-semibold">
            <div
              className="sm:flex hidden
     p-2 bg-opacity-20 text-lg lg:text-2xl font-bold justify-center drop-shadow-md"
            >
              <span className="text-green-500 dark:text-green-400  ">
                Invoice
              </span>
              <span className="text-blue-500 dark:text-yellow-400">Systm</span>
            </div>
          </h1>
          <HandMetal />
        </Link>
        {user ? (
          <div className="flex flex-col items-center justify-center">
            <div
              onClick={() => setIsPopUp((preve) => !preve)}
              className="cursor-pointer h-[35px] w-[35px] text-white rounded-full flex justify-center items-center bg-gray-400 p-1"
            >
              <User />
            </div>
            <p className="sm:flex hidden font-bold text-green-400">{user?.username}</p>
          </div>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-500"><Link href="/sign-in">
            Sign in
          </Link>
          </Button>
        )}
      </div>
      {isPopUp && user && (
        <CardContent className="flex justify-center items-center rounded-0 w-[200px] absolute top-[5rem] right-[0rem]">
          <Button
            onClick={handleLogout}
            className="sm:h-[40px] w-[80px] h-[30px] bg-red-600 hover:bg-red-500"
          >
            Logout
          </Button>
        </CardContent>
      )}
    </div>
  );
};

export default Navbar;
