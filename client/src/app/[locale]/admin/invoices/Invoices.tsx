"use client";

import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Invoice } from "@/models/invoice";
import apiClient from "@/services/api-client";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const columns: ColumnDef<Invoice>[] = [
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
    cell: ({ row }: any) => {
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
    cell: ({ row }: any) => {
      const id = row.getValue("id");
      return (
        <div>
          <div className="flex gap-2 items-center">
            <Link
              className="bg-blue-600 px-5 py-2 text-white rounded-[10px]"
              href={`invoices/details/${id}`}
            >
              View
            </Link>
          </div>
        </div>
      );
    },
  },
];

const Invoices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<Invoice[]>(
          `/invoices?searchQuery=${searchQuery}`
        );
        setInvoices(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);

  return (
    <div className="flex justify-evenly">
      <div className="flex flex-col gap-5  w-full">
        <div className="flex md:flex-row flex-col-reverse lg:gap-[20rem] gap-5 ">
          <div className="flex sm:gap-[9rem] gap-[15rem]">
            <PageTitle title="Invoices" />
            <div className="flex gap-1 relative top-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoices"
                className="border lg:w-[20rem] w-[15rem]  h-[35px]"
              />
              <Button className="flex bg-blue-600 hover:bg-blue-500 h-[35px] border">
                <Search />
              </Button>
            </div>
          </div>
        </div>
        {isLoading && <Spinner />}
        {invoices && <DataTable columns={columns} data={invoices} />}
      </div>
    </div>
  );
};

export default Invoices;
