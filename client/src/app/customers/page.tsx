"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import {Trash2,UserPlus,User} from "lucide-react";
import {useDispatch} from "react-redux";
import { fetchCustomers } from "@/redux/actions/customers";
type Props = {};
type Customers = {
  id: string;
  name: string;
  email: string;
  billing_address: string;
  contact_person: string;
  phone: string;
};

const columns: ColumnDef<Customers>[] = [
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
    accessorKey: "billing_address",
    header: "Billing Address"
  },
  {
    accessorKey: "contact_person",
    header: "Contact Person"
  },
    {
    accessorKey: "phone",
    header: "Phone"
  },
  {
    accessorKey: "id",
    header: "Manage",
    cell: ({ row}) => {
      const id = row.getValue("id");
      return (
        <div className="flex gap-2 items-center">
          <Link className="bg-blue-400 px-5 py-2 text-white rounded-[10px]" href={`/customers/details/${id}`}>View</Link>
        </div>
      );
    }
  },
];



export default function CustomersPage({}: Props) {
  const [customer, setCustomer] = useState<Customers[] | null>(null);
const dispatch = useDispatch();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch(fetchCustomers());
      setCustomer(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, [dispatch]);
  return (
    <div className="flex justify-evenly">
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Customers" />
      {customer && <DataTable columns={columns} data={customer} />}
    </div>
    <div className="flex justify-center items-center sm:relative absolute right-[10px] sm:top-[-10px] sm:w-[70px] w-[50px] sm:h-[65px] h-[50px] rounded-full bg-red-200">
    <Link href='/customers/addCustomer' ><UserPlus/></Link>
    </div>
    </div>
  );
}
