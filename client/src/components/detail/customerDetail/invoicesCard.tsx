"use client"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";
import { DataTable, ColumnDef } from "@/components/DataTable";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { fetchCustomer } from "@/redux/actions/customers";
import { cn } from "@/lib/utils";

type Props = {
  params: any;
};

type Customer = {
  id: string;
  invoices: Invoice[];
};

type Invoice = {
  status: any;
  date?: any;
  due_date?: any;
  invoice_number?: any;
};

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoice_number",
    header: "Invoice Number",
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
];

const InvoiceCard = ({ params }: Props) => {
  const [invoice, setInvoice] = useState<Customer | null>(null);
  const dispatch = useDispatch();
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCustomer(id));
        setInvoice(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <div className="flex justify-evenly">
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title="Invoices" />
        {invoice && <DataTable columns={columns} data={invoice.invoices} />}
      </div>
    </div>
  );
};

export default InvoiceCard;