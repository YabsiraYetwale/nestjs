/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import {Trash2,UserPlus,User} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type Props = {};
type Payment = {
  name: string;
  email: string;
  lastOrder: string;
  method: string;
  path:string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10  bg-zinc-100 py-2 border-b border-s-zinc-200 flex items-center justify-center">
          <User/>
          </div>
          <p>{row.getValue("name")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "lastOrder",
    header: "Last Order"
  },
  {
    accessorKey: "method",
    header: "Method"
  },
  {
    accessorKey: "path",
    header: "Manage",
    cell: ({ row,id }) => {
      return (
        <div className="flex gap-2 items-center">
          <Link className={buttonVariants()} href={`/customers/details/${id}`}>View</Link>
        </div>
      );
    }
  },
];

const data: Payment[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    lastOrder: "2023-01-01",
    method: "Credit Card",
    path:''
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    lastOrder: "2023-02-15",
    method: "PayPal",
    path:''
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    lastOrder: "2023-03-20",
    method: "Stripe",
    path:''
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    lastOrder: "2023-04-10",
    method: "Venmo",
    path:''
  },
  {
    name: "Michael Davis",
    email: "michael@example.com",
    lastOrder: "2023-05-05",
    method: "Cash",
    path:''
  },
  {
    name: "Sophia Wilson",
    email: "sophia@example.com",
    lastOrder: "2023-06-18",
    method: "Bank Transfer",
    path:''
  },
  {
    name: "Liam Garcia",
    email: "liam@example.com",
    lastOrder: "2023-07-22",
    method: "Payoneer",
    path:''
  },
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    lastOrder: "2023-08-30",
    method: "Apple Pay",
    path:''
  },
  {
    name: "Noah Rodriguez",
    email: "noah@example.com",
    lastOrder: "2023-09-12",
    method: "Google Pay",
    path:''
  },
  {
    name: "Ava Lopez",
    email: "ava@example.com",
    lastOrder: "2023-10-25",
    method: "Cryptocurrency",
    path:''
  },
  {
    name: "Elijah Hernandez",
    email: "elijah@example.com",
    lastOrder: "2023-11-05",
    method: "Alipay",
    path:''
  },
  {
    name: "Mia Gonzalez",
    email: "mia@example.com",
    lastOrder: "2023-12-08",
    method: "WeChat Pay",
    path:''
  },
  {
    name: "James Perez",
    email: "james@example.com",
    lastOrder: "2024-01-18",
    method: "Square Cash",
    path:''
  },
  {
    name: "Charlotte Carter",
    email: "charlotte@example.com",
    lastOrder: "2024-02-22",
    method: "Zelle",
    path:''
  },
  {
    name: "Benjamin Taylor",
    email: "benjamin@example.com",
    lastOrder: "2024-03-30",
    method: "Stripe",
    path:''
  },
];

export default function UsersPage({}: Props) {
  return (
    <div className="flex justify-evenly">
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Customers" />
      <DataTable columns={columns} data={data} />
    </div>
    <div className="flex justify-center items-center sm:relative absolute right-[10px] sm:top-[-10px] sm:w-[70px] w-[50px] sm:h-[65px] h-[50px] rounded-full bg-red-200">
    <Link href='/customers/addCustomer' ><UserPlus/></Link>
    </div>
    </div>
  );
}
