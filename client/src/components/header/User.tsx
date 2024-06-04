"use client";
import Link from "next/link";
import { Button} from "../ui/button";
import {User} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/redux/actions/auth";
import { CardContent } from "../Card";
import { useRouter, usePathname } from "next/navigation";
import {useLocale } from 'next-intl';


type userProps = {
  name: string;
};
const CurrentUser = () => {
  const [user, setUser] = useState<userProps | null>(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

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
    dispatch<any>(localStorage.clear(), router.push(`/${localActive}/sign-in`));
  };

  return (
    <>
      <div className="container flex items-center justify-between">
       
        
        {user ? (
          <div className="flex items-center justify-center gap-5">
         
          <div className="flex flex-col items-center justify-center">
            <div
            className="flex gap-5"
              onClick={() => setIsPopUp((preve) => !preve)}
            >
             <div className="cursor-pointer h-[35px] w-[35px] text-white rounded-full flex justify-center items-center bg-gray-400 p-1">
             <User />
              </div>
            </div>
            {/* <p className="sm:flex hidden font-bold text-green-400">{user?.name}</p> */}
          </div>
          </div>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-500"><Link href={`/${localActive}/sign-in`}>
           {localActive === "en" ? "Sign in" : "በመለያ ይግቡ"}
          </Link>
          </Button>
        )}
      </div>
      {isPopUp && user && (
        <CardContent className="flex flex-col justify-center items-center rounded-0 w-[200px] absolute top-[4rem] right-[0rem]">
          <p className="sm:flex hidden font-bold text-green-400">{user?.name}</p>
          <Button
            onClick={handleLogout}
            className="sm:h-[40px] w-[80px] h-[30px] bg-red-600 hover:bg-red-500"
          >
            {localActive === "en" ? "Logout" : "ይውጡ"}
            
          </Button>
        </CardContent>
      )}
    </>
   
  );
};

export default CurrentUser;
