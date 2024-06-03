"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useLocale } from 'next-intl';
import LocalSwitcher from "../../lib/local-switcher";

type Props = {};

interface Setting {
  category: string;
  value: string | number | boolean;
  cell?: React.FC<CellProps>;
}

type CellProps = {
  row: any;
};

const Cell: React.FC<CellProps> = ({ row }) => {
  const localActive = useLocale();
  if (row.getValue("category") === "Language" || row.getValue("category") === "ቋንቋ") {
    const languageValue = localActive === "en" ? "English" : "አማርኛ";
    return <div><LocalSwitcher/></div>;
    // return <div>{languageValue}</div>;
  }
  return <div>{row.getValue("value")}</div>;
};



export default function Settings({}: Props) {
  const localActive = useLocale();

  const columns: ColumnDef<Setting>[] = [
    {
      accessorKey: "category",
      header:(localActive === "en" ? "Category" : "ምድብ")
    },
    {
      accessorKey: "value",
      header:(localActive === "en" ? "Value" : "ዋጋ"),
      cell: Cell
    }
  ];
  
  const data: Setting[] = [
    {
      category:(localActive === "en" ? "Account" : "አካውንት"),
      value: "true"
    },
    {
      category:(localActive === "en" ? "Notifications" : "ማስታወቂያዎች"),
      value: "false"
    },
    {
      category:(localActive === "en" ? "Language" : "ቋንቋ"),
      value: "English",
      cell: Cell
    },
    {
      category:(localActive === "en" ? "Theme" : "ጭብጥ"),
      value: "Dark"
    }
  ];
  return <DataTable columns={columns} data={data} />;
}
