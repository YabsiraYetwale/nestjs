"use client"
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Search} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchInvoicesBySearch } from "@/redux/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useLocale } from 'next-intl';

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

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const date = new Date(dateString);
  const originalDate = date.toLocaleDateString(undefined, options);
  const [day, month, year] = originalDate.split("/");
  return `${year}-${month}-${day}`;
};

type InvoiceWithClient = Invoice & { client: Client };

type CellProps = {
  row: any;
};

const Cell: React.FC<CellProps> = ({ row }) => {
  const id = row.getValue("id");
  const localActive = useLocale();

  return (
    <div>
      <div className="flex gap-2 items-center">
        <Link
          className="bg-blue-600 px-5 py-2 text-white rounded-[10px]"
          href={`/${localActive}/invoices/details/${id}`}
        >
          View
        </Link>
      </div>
    </div>
  );
};

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
    cell: ({ row }: any) => {
      const formattedDate = formatDate(row.getValue("date"));
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
  },
  {
    accessorKey: "id",
    header: "Manage",
    cell: Cell,
  },
];

export default function Invoices({}: Props) {
  const [invoices, setInvoices] = useState<InvoiceWithClient[] | null>(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
 const localActive = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(
          fetchInvoicesBySearch(search, router,localActive),
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
      fetchInvoicesBySearch(search, router,localActive)
    );
    setInvoices(response);
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
    </>
  );
}
