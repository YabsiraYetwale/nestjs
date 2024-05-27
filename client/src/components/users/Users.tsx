"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import {ArrowUp,User} from "lucide-react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import { fetchUsers } from "@/redux/actions/auth";
import { Button } from "@/components/ui/button";
import { Users } from "@/components/schemas/userProps";
import {useLocale } from 'next-intl';

type Props = {};


const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "username",
    header: "User Name",
    cell: ({ row }:any) => {
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
    accessorKey: "id",
    header: "Manage",
    cell: ({ row}:any) => {
      const id = row.getValue("id");
      const localActive = useLocale();

      return (
        <div className="flex gap-2 items-center">
          <Link className="bg-blue-600 px-5 py-2 text-white rounded-[10px]" href={`/${localActive}/users/details/${id}`}>View</Link>
        </div>
      );
    }
  },
];



export default function UsersPage({}: Props) {
  const [user, setUser] = useState<Users[] | null>(null);
  const dispatch = useDispatch();
  const localActive = useLocale();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchUsers());
        setUser(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
  
  {user && <DataTable columns={columns} data={user} />}
 </>
  );
}
