"use client";

import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import Permission from "@/models/permission";
import Role from "@/models/role";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  roles: Role[];
}

const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "id",
    header: "Role ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.getValue("permissions") as Permission[];
      return permissions.map((permission, index) => (
        <p key={permission.action}>
          {permission.label}
          {permissions.length - 1 == index ? "" : ","}
        </p>
      ));
    },
  },
  {
    accessorKey: "options",
    header: "",
    cell: ({ row }) => (
      <div className="flex gap-3">
        <Link href={`roles/edit/${row.getValue("id")}`}>
          <Button className="bg-zinc-500 hover:bg-zinc-600 w-12 h-10">
            <Edit size={20} />
          </Button>
        </Link>

        <Button className="bg-red-600 hover:bg-red-500 w-12 h-10">
          <Trash size={20} />
        </Button>
      </div>
    ),
  },
];

const Roles = ({ roles }: Props) => {
  return <DataTable columns={columns} data={roles} />;
};

export default Roles;
