"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import {Search} from "lucide-react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import { fetchInvoices } from "@/redux/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {};
type Invoices = {
  invoice_number: string;
  id: string;
  name: string;
  status: string;
  date: string;
  due_date: string;
};

const columns: ColumnDef<Invoices>[] = [
  {
    accessorKey: "invoice_number",
    header: "Invoice Number"
  },
  {
    accessorKey: "name",
    header: "Customer Name"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }:any) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("status") === "unpaid",
            "bg-orange-200": row.getValue("status") === "read",
            "bg-green-200": row.getValue("status") === "paid"
          })}
        >
          {row.getValue("status")}
        </div>
      );
    }
  },
  {
    accessorKey: "date",
    header: "Date"
  },
  {
    accessorKey: "due_date",
    header: "Due Date"
  },
  {
    accessorKey: "id",
    header: "Manage",
    cell: ({ row }:any) => {
      const id = row.getValue("id");
      return (
        <div>
        <div className="flex gap-2 items-center">
          <Link className="bg-blue-400 px-5 py-2 text-white rounded-[10px]" href={`/invoices/details/${id}`}>View</Link>
        </div>
        </div>
      );
    }
  },
];

export default function InvoicePage({}: Props) {
  
const [invoice, setInvoice] = useState<Invoices[] | null>(null);
const dispatch = useDispatch();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch<any>(fetchInvoices());
      setInvoice(response);
      console.log(response)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, [dispatch]);

return (
        <div className="flex justify-evenly">
        <div className="flex flex-col gap-5  w-full">
          <div className="flex gap-[9rem]">
          <PageTitle title="Invoices" />
         <form className="flex gap-1 relative top-1">
         <Input placeholder="search invoices" className="border w-[20rem] h-[35px]"/>
         < Button className="flex bg-blue-600 hover:bg-blue-500 h-[35px] border"><Search/></ Button>
         </form>
          </div>
          {invoice && <DataTable columns={columns} data={invoice} />}
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] relative top-[4px] left-[-90px]">
         <Link href='/invoices/addInvoice'>
            Add New
        </Link>
        </Button>
        </div>
  );
}


