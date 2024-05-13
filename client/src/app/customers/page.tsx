"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {ArrowUp,User,Search} from "lucide-react";
import {useDispatch} from "react-redux";
import { fetchCustomers } from "@/redux/actions/customers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type Props = {};
export type Customers = {
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
    cell: ({ row }:any) => {
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
    cell: ({ row}:any) => {
      const id = row.getValue("id");
      return (
        <div className="flex gap-2 items-center">
          <Link className="bg-blue-600 px-5 py-2 text-white rounded-[10px]" href={`/customers/details/${id}`}>View</Link>
        </div>
      );
    }
  },
];



export default function CustomersPage({}: Props) {
  const [customer, setCustomer] = useState<Customers[] | null>(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch<any>(fetchCustomers(search,router));
      setCustomer(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, [dispatch]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const response = await dispatch<any>(
    fetchCustomers(search, router)
  );
  setCustomer(response);
};
  return (
    <>
    {/* <div className="flex justify-evenly">
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Customers" />
      {customer && <DataTable columns={columns} data={customer} />}
    </div>
    <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] relative top-[4px] left-[-90px]">
         <Link href='/customers/addCustomer'>
            Add New
        </Link>
        </Button>
    </div> */}
    
    <div className="flex justify-evenly">
      <div className="flex flex-col gap-5  w-full">
        <div className="flex md:flex-row flex-col-reverse lg:gap-[20rem] gap-5 ">
          <div className="flex sm:gap-[9rem] gap-[15rem]">
            <PageTitle title="CUstomers" />
            <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] relative top-[4px] left-[-90px]">
              <Link href="/customers/addCustomer">Add New</Link>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-1 relative top-1">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers"
              className="border lg:w-[20rem] w-[15rem]  h-[35px]"
            />
            <Button className="flex bg-blue-600 hover:bg-blue-500 h-[35px] border">
              <Search />
            </Button>
          </form>
        </div>
        {customer && <DataTable columns={columns} data={customer} />}
      </div>
    </div>
    <Button onClick={()=>window.scrollTo(0,0)} className="absolute bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400">
          <p><ArrowUp /></p> 
      </Button>
    </>
  );
}
