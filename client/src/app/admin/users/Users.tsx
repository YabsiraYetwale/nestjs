"use client";

import { DataTable } from "@/components/DataTable";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import apiClient from "@/services/api-client";
import { ColumnDef } from "@tanstack/react-table";
import { EyeOffIcon, PencilIcon, TrashIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FetchUsers {
  allUsers: User[];
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "User Name",
    cell: ({ row }: any) => {
      return (
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10  bg-zinc-100 py-2 border-b border-s-zinc-200 flex items-center justify-center">
            <UserIcon />
          </div>
          <p>{row.getValue("username")} </p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }: any) => {
      const id = row.getValue("id");
      return (
        <div className="flex gap-2 items-center">
          <Link href={`users/details/${id}`}>
            <Button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 text-white">
              View
            </Button>
          </Link>
          <Link href={`users/edit/${id}`}>
            <Button className="bg-zinc-500 hover:bg-zinc-600">
              <PencilIcon size={16} />
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "restrict",
    header: "Restrict",
    cell: ({ row }: any) => {
      const id = row.getValue("id");
      return (
        <Button className="hover:bg-gray-300 bg-gray-200 flex gap-2 items-center justify-center">
          <EyeOffIcon color="red" size={16}></EyeOffIcon>
        </Button>
      );
    },
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      apiClient
        .get<FetchUsers>("/auth")
        .then((res) => {
          console.log(res.data);
          setUsers(res.data.allUsers);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        users && <DataTable columns={columns} data={users} />
      )}
    </>
  );
};

export default Users;
