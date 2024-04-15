"use client"
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import { Search,ArrowUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchInvoicesBySearch } from "@/redux/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {};

type Invoice = {
  invoice_number: string;
  id: string;
  name: string;
  status: string;
  date: string;
  due_date: string;
};

type Client = {
  id: string;
  name: string;
};

type InvoiceWithClient = Invoice & { client: Client };

const columns: ColumnDef<InvoiceWithClient>[] = [
  {
    accessorKey: "invoice_number",
    header: "Invoice Number",
  },
  {
    accessorKey: "client.name",
    header: "Customer Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }:any) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "text-red-600": row.getValue("status") === "unpaid",
            "text-orange-600": row.getValue("status") === "read",
            "text-green-600": row.getValue("status") === "paid",
          })}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
  },
  {
    accessorKey: "id",
    header: "Manage",
    cell: ({ row }:any) => {
      const id = row.getValue("id");
      return (
        <div>
          <div className="flex gap-2 items-center">
            <Link
              className="bg-blue-600 px-5 py-2 text-white rounded-[10px]"
              href={`/invoices/details/${id}`}
            >
              View
            </Link>
          </div>
        </div>
      );
    },
  },
];

export default function InvoicePage({}: Props) {
  const [invoices, setInvoices] = useState<InvoiceWithClient[] | null>(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(
          fetchInvoicesBySearch(search, router)
        );
        setInvoices(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch<any>(
      fetchInvoicesBySearch(search, router)
    );
    setInvoices(response);
  };

  return (
    <>
    <div className="flex justify-evenly">
      <div className="flex flex-col gap-5  w-full">
        <div className="flex md:flex-row flex-col-reverse lg:gap-[20rem] gap-5 ">
          <div className="flex sm:gap-[9rem] gap-[15rem]">
            <PageTitle title="Invoices" />
            <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] relative top-[4px] left-[-90px]">
              <Link href="/invoices/addInvoice">Add New</Link>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-1 relative top-1">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices"
              className="border lg:w-[20rem] w-[15rem]  h-[35px]"
            />
            <Button className="flex bg-blue-600 hover:bg-blue-500 h-[35px] border">
              <Search />
            </Button>
          </form>
        </div>
        {invoices && <DataTable columns={columns} data={invoices} />}
      </div>
    </div>
    <Button onClick={()=>window.scrollTo(0,0)} className="absolute bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400">
    <p><ArrowUp /> </p>
      </Button>
    </>
  );
}
