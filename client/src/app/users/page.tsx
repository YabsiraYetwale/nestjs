"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import {UserPlus,User} from "lucide-react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import { fetchUsers } from "@/redux/actions/auth";

type Props = {};
type Users = {
  username: string;
  email: string;
  role: string;
  path?:string;
};

const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "username",
    header: "User Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
           <div className="h-10 w-10  bg-zinc-100 py-2 border-b border-s-zinc-200 flex items-center justify-center">
          <User/>
          </div>
          <p>{row.getValue("username")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "path",
    header: "Manage",
    cell: ({ row,id }) => {
      return (
        <div className="flex gap-2 items-center">
          <Link className="bg-blue-400 px-5 py-2 text-white rounded-[10px]" href={`/users/details/${id}`}>View</Link>
        </div>
      );
    }
  },
];



export default function UsersPage({}: Props) {
  const [user, setUser] = useState<Users[] | null>(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchUsers());
        setUser(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="flex justify-evenly">
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Users" />
      {user && <DataTable columns={columns} data={user} />}
    </div>
    {/* <div className="flex justify-center items-center sm:relative absolute right-[10px] sm:top-[-10px] sm:w-[70px] w-[50px] sm:h-[65px] h-[50px] rounded-full bg-red-200">
    <Link href='/users/addUser'><UserPlus/></Link>
    </div> */}
    </div>
  );
}
