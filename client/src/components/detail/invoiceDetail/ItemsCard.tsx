"use client"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";
import { DataTable, ColumnDef } from "@/components/DataTable";
import React from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  params: any;
};

type Invoice = {
  id: string;
};

type Item = {
  invoice_id: string;
  unit_price: number;
  tax_rate: number;
  quantity: number;
  amount: number;
  description: string;
};

type InvoiceWithItems = Invoice & { line_items: Item[] };

const columns: ColumnDef<InvoiceWithItems>[] = [
    {
      accessorKey: "description",
      header: "Item",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "unit_price",
      header: "Unit Price",
    },
    {
      accessorKey: "tax_rate",
      header: "Tax Rate",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }:any) => {
        return (
          <div className="flex gap-2 items-center">
            <p>{row.getValue("unit_price") * row.getValue("quantity")}</p>
          </div>
        );
      },
    },
  ];

const ItemsPage = ({ params }: Props) => {
  const [items, setItems] = useState<InvoiceWithItems | null>(null);
  const dispatch = useDispatch();
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchInvoice(id));
        setItems(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <div className="flex justify-evenly">
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title="Items" />
        {items && <DataTable columns={columns} data={items.line_items} />}
      </div>
      <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] relative top-[4px] left-[-90px]">
        <Link href="/customers/addCustomer">Add New</Link>
      </Button>
    </div>
  );
};

export default ItemsPage;