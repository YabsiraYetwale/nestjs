"use client";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardContent } from "../../Card";
import { Button } from "../../ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteUser, fetchUser } from "@/redux/actions/auth";
import {useLocale } from 'next-intl';

type UserProps = {
  username: string;
  role: string;
  email: string;
};
export default function UserDetail({ params }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const localActive = useLocale();
  const id = params.id as string;

  const [user, setUser] = useState<UserProps | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  console.log("idscus", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchUser(id));
        setUser(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id,dispatch]);
  const handleDelete = () => {
    setIsDelete(!isDelete);
  };
  const handleConfirm = () => {
    dispatch<any>(deleteUser(id,router,localActive))
  };
  return (
    <div className='flex flex-col gap-[170px]'>
      <section className="flex gap-5">
        <div className=" h-20 w-20 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User />
        </div>
        <section className="flex flex-col gap-5 py-[20px]">
          <div className="flex flex-col">
            <div className="font-bold text-[20px] text-gray-600">
              {user?.username}
            </div>
            <p className="text-sm text-gray-400">{user?.role} in Invoice system.</p>
          </div>
              <div className="flex flex-col gap-2">
                <div className="font-bold text-gray-400">Email Address</div>
                <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
        </section>
      </section>
   <div className="flex absolute lg:right-[30rem] top-[20rem] top-[15rem]  bg-gray-200 flex-row justify-center items-center">
        {isDelete && (
          <CardContent className="w-[300px] flex flex-coljustify-center items-center">
            <>
            <div>{localActive === "en" ? "Are Sou Sure To Delete" : "ለመሰረዝ እርግጠኛ ነዎት"}</div>
            <div className="flex gap-5 flex-row justify-center items-center">
            <Button
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-500 w-[100px]"
            >
             {localActive === "en" ? "Yes" : "አዎ"}
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-blue-600 hover:bg-blue-500 w-[100px]"
            >
              {localActive === "en" ? "No" : "የለም"}
            </Button>
            </div>
            </>
          </CardContent>
        )}
      </div>
      <CardContent className="flex flex-row justify-between">
        <Link href={`/${localActive}/users/edit/${id}`}>
          <Button className="bg-blue-600 hover:bg-blue-500 w-[100px]">
          {localActive === "en" ? "Edit" : "አሻሽል"}
          </Button>
        </Link>
        <Button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-500 w-[100px]"
        >
          {localActive === "en" ? "Delete" : "ሰርዝ"}
        </Button>
      </CardContent>
    </div>
  );
}
