"use client"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";
import React from "react";
import { ColumnDef,ItemDataTable } from "@/components/ItemDataTable";

type Props = {
  params: any;
};

type Invoice = {
  id: string;
  line_items: Item[];
};

type Item = {
  invoice_id: string;
  unit_price: number;
  tax_rate: number;
  quantity: number;
  amount: number;
  description: string;
};

const ItemsPage = ({ params }: Props) => {
  const [items, setItems] = useState<Invoice | null>(null);
  const dispatch = useDispatch();
  const id = params.id as string;
  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "description",
      header:"Item",
    },
    {
      accessorKey: "quantity",
      header:"Quantity" ,
    },
    {
      accessorKey: "unit_price",
      header:"Unit Price($)",
    },
    {
      accessorKey: "tax_rate",
      header:"Tax Rate(%)",
    },
    {
      accessorKey: "amount",
      header:"Amount($)",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2 items-center">
            <p>{row.getValue("unit_price") * row.getValue("quantity")}</p>
          </div>
        );
      },
    },
  ];

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
        {/* <PageTitle title="Items" /> */}
        {items && <ItemDataTable columns={columns} data={items.line_items} />}
      </div>
    </div>
  );
};

export default ItemsPage;