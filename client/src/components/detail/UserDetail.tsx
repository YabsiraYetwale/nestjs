"use client";
import { TrashIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { CardContent } from "../Card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/redux/actions/auth";
import { User } from "@/models/user";
import apiClient from "@/services/api-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Spinner from "../Spinner";
import { Skeleton } from "../ui/skeleton";

interface FetchUser {
  user: User;
}
interface Props {
  params: {
    id: string;
  };
}

export default function UserDetail({ params: { id } }: Props) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  const handleConfirm = () => {
    dispatch<any>(deleteUser(id, router));
  };

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      apiClient
        .get<FetchUser>(`/auth/${id}`)
        .then((res: { data: { user: SetStateAction<User>; }; }) => {
          setUser(res.data.user);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col gap-4 md:w-2/3 lg:w-1/2 ">
      <div className="flex flex-col gap-5 ">
        <Avatar className="w-32 h-32 self-center">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-md font-semibold text-gray-600">
          Fullname:
          <span className="text-sm text-gray-400">{user.name}</span>
        </p>
        <p className="text-md font-semibold text-gray-600">
          Email: <span className="text-sm text-gray-400">{user.email}</span>
        </p>
        <p className="text-md font-semibold text-gray-600">
          Username:{" "}
          <span className="text-sm text-gray-400">{user.username}</span>
        </p>
        <p className="text-md font-semibold text-gray-600">
          Company:{" "}
          <span className="text-sm text-gray-400">{user.company_id}</span>
        </p>
        <p className="text-md font-semibold text-gray-600">
          Role: <span className="text-sm text-gray-400">{user.roles}</span>
        </p>
        <p className="text-md font-semibold text-gray-600">
          Permissions:{" "}
          <span className="text-sm text-gray-400">Permissions</span>
        </p>
      </div>
      <div className="flex absolute lg:right-[30rem]  top-[15rem]  bg-gray-200 flex-row justify-center items-center">
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
      <div className="flex flex-row justify-between">
        <Link href={`/admin/users/edit/${id}`}>
          <Button className="bg-blue-600 hover:bg-blue-500 w-[100px]">
            Edit
          </Button>
        </Link>
        <Button
          onClick={handleDelete}
          className="hover:bg-red-500 bg-red-400 flex gap-2 items-center justify-center"
        >
          <TrashIcon size={16}></TrashIcon>
        </Button>
      </div>
    </div>
  );
}
