"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {User,Search} from "lucide-react";
import {useDispatch} from "react-redux";
import { fetchCustomersBySearch } from "@/redux/actions/customers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomersProps } from "../schemas/customerProps";
import Spinner from "../Spinner";

type Props = {};

type CellProps = {
  row: any;
};

const Cell: React.FC<CellProps> = ({ row }) => {
  const id = row.getValue("id");

  return (
    <div className="flex gap-2 items-center">
      <Link
        className="bg-blue-600 px-5 py-2 text-white rounded-[10px]"
        href={`/dashboard/customers/details/${id}`}
      >
      { "View" : "ዝርዝር"}
      </Link>
    </div>
  );
};



export default function Customers({}: Props) {
  const [customer, setCustomer] = useState<CustomersProps[] | null>(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const columns: ColumnDef<CustomersProps>[] = [
  {
    accessorKey: "name",
    header:"Name",
    cell: ({ row }: any) => {
      return (
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10  bg-zinc-100 py-2 border-b border-s-zinc-200 flex items-center justify-center">
            <User />
          </div>
          <p>{row.getValue("name")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "billing_address",
    header: "Billing Address",
  },
  {
    accessorKey: "contact_person",
    header:"Contact Person",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "id",
    header: "Manage",
    cell: Cell,
  },
]



useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true); 
    try {
      const response = await dispatch<any>(fetchCustomersBySearch(search,router));
      setCustomer(response);
    } catch (error) {
      console.error('Error:', error);
    }
    finally {
      setIsLoading(false); 
    }
  };
  fetchData();
}, [dispatch]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const response = await dispatch<any>(
    fetchCustomersBySearch(search, router)
  );
  setCustomer(response);
};
  return (
    <>
      <div className="flex flex-col gap-5  w-full">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 relative top-[-35px] left-[25rem]">
        {/* <div className="grid  md:flex-row flex-col-reverse lg:gap-[20rem] gap-5 "> */}
        {/*  */}
        <div  className="hidden"></div>
          <form onSubmit={handleSubmit} className="flex gap-1 relative top-1">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={ "Search customers" : "ደንበኞችን ይፈልጉ"}
              className="border lg:w-[20rem] w-[15rem]  h-[35px]"
            />
            <Button className="flex bg-blue-600 hover:bg-blue-500 h-[35px] border">
              <Search />
            </Button>
          </form>
        </div>
        {isLoading && <Spinner />}
        {customer && <DataTable columns={columns} data={customer} />}
      </div>
    </>

  );
}
