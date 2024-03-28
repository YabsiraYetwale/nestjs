"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import {CirclePlus} from "lucide-react";
import Link from "next/link";

type Props = {};
type Payment = {
  invoice_number: string;
  name: string;
  status: string;
  date: string;
  due_date: string;
  path?: string;
};

const columns: ColumnDef<Payment>[] = [
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
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("status") === "Unpaid",
            "bg-orange-200": row.getValue("status") === "Read",
            "bg-green-200": row.getValue("status") === "Paid"
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
    accessorKey: "path",
    header: "Manage",
    cell: ({ row,id }) => {
      return (
        <div className="flex gap-2 items-center">
          <Link className="bg-blue-400 px-5 py-2 text-white rounded-[10px]" href={`/invoices/details/${id}`}>View</Link>
        </div>
      );
    }
  },
];

const data: Payment[] = [
  {
    invoice_number: "ORD001",
    name:"alice",
    status: "Unpaid",
    date: "2023-01-15",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD002",
    name:"alice",
    status: "Read",
    date: "2023-02-20",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD003",
    name:"alice",
    status: "Paid",
    date: "2023-03-10",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD004",
    name:"alice",
    status: "Unpaid",
    date: "2023-04-05",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD005",
    name:"alice",
    status: "Paid",
    date: "2023-05-12",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD006",
    name:"alice",
    status: "Read",
    date: "2023-06-18",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD007",
    name:"alice",
    status: "Paid",
    date: "2023-07-22",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD008",
    name:"alice",
    status: "Unpaid",
    date: "2023-08-30",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD009",
    name:"alice",
    status: "Read",
    date: "2023-09-05",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD010",
    name:"alice",
    status: "Paid",
    date: "2023-10-18",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD011",
    name:"alice",
    status: "Unpaid",
    date: "2023-11-25",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD012",
    name:"alice",
    status: "Paid",
    date: "2023-12-08",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD013",
    name:"alice",
    status: "Read",
    date: "2024-01-15",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD014",
    name:"alice",
    status: "Paid",
    date: "2024-02-20",
    due_date: "2025-03-22",
  },
  {
    invoice_number: "ORD015",
    name:"alice",
    status: "Unpaid",
    date: "2024-03-30",
    due_date: "2025-03-22",
  },
];

export default function invoice_numbersPage({}: Props) {
  return (
        <div className="flex justify-evenly">
        <div className="flex flex-col gap-5  w-full">
          <PageTitle title="Invoices" />
          <DataTable columns={columns} data={data} />
        </div>
        <div className="flex justify-center items-center sm:relative absolute right-[10px] sm:top-[-10px] sm:w-[70px] w-[50px] sm:h-[65px] h-[50px] rounded-full bg-red-200">
        <Link href='/invoices/addInvoice'><CirclePlus/></Link>
        </div>
        </div>
  );
}
