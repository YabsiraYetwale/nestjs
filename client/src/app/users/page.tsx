"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import {UserPlus,User} from "lucide-react";
import Link from "next/link";

type Props = {};
type Payment = {
  username: string;
  email: string;
  role: string;
  path?:string;
};

const columns: ColumnDef<Payment>[] = [
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

const data: Payment[] = [
  {
    username: "John Doe",
    email: "john@example.com",
    role: "admin",
  },
  {
    username: "Alice Smith",
    email: "alice@example.com",
    role: "admin",
  },
  {
    username: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
  },
  {
    username: "Emma Brown",
    email: "emma@example.com",
    role: "user",
  },
  {
    username: "Michael Davis",
    email: "michael@example.com",
    role: "user",
  },
  {
    username: "Sophia Wilson",
    email: "sophia@example.com",
    role: "user",
  },
  {
    username: "Liam Garcia",
    email: "liam@example.com",
    role: "user",
  },
  {
    username: "Olivia Martinez",
    email: "olivia@example.com",
    role: "user",
  },
  {
    username: "Noah Rodriguez",
    email: "noah@example.com",
    role: "user",
  },
  {
    username: "Ava Lopez",
    email: "ava@example.com",
    role: "user",
  },
  {
    username: "Elijah Hernandez",
    email: "elijah@example.com",
    role: "user",
  },
  {
    username: "Mia Gonzalez",
    email: "mia@example.com",
    role: "user",
  },
  {
    username: "James Perez",
    email: "james@example.com",
    role: "user",
  },
  {
    username: "Charlotte Carter",
    email: "charlotte@example.com",
    role: "user",
  },
  {
    username: "Benjamin Taylor",
    email: "benjamin@example.com",
    role: "user",
  },
];

export default function UsersPage({}: Props) {
  return (
    <div className="flex justify-evenly">
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Users" />
      <DataTable columns={columns} data={data} />
    </div>
    {/* <div className="flex justify-center items-center sm:relative absolute right-[10px] sm:top-[-10px] sm:w-[70px] w-[50px] sm:h-[65px] h-[50px] rounded-full bg-red-200">
    <Link href='/users/addUser'><UserPlus/></Link>
    </div> */}
    </div>
  );
}
