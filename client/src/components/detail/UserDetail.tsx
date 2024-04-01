"use client";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardContent } from "../Card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteUser, fetchUser } from "@/redux/actions/auth";

export default function UserDetail({ params }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = params.id;
  const [user, setUser] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  console.log("idscus", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchUser(id));
        setUser(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const handleDelete = () => {
    setIsDelete(!isDelete);
  };
  const handleConfirm = () => {
    dispatch(deleteUser(id,router))
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
            <div>Are Sou Sure To Delete</div>
            <div className="flex gap-5 flex-row justify-center items-center">
            <Button
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-500 w-[100px]"
            >
              Yes
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-blue-600 hover:bg-blue-500 w-[100px]"
            >
              No
            </Button>
            </div>
            </>
          </CardContent>
        )}
      </div>
      <CardContent className="flex flex-row justify-between">
        <Link href={`/users/edit/${id}`}>
          <Button className="bg-blue-600 hover:bg-blue-500 w-[100px]">
            Edit
          </Button>
        </Link>
        <Button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-500 w-[100px]"
        >
          Delete
        </Button>
      </CardContent>
    </div>
  );
}
