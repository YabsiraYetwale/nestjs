import React from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Role from "@/models/role";
import Roles from "./Roles";

export const roles: Role[] = [
  {
    id: "1",
    name: "Administrator",
    value: "admin",
    permissions: [
      { action: "can_delete_user", label: "Can Delete Users" },
      { action: "can_get_user", label: "Can View Users" },
    ],
  },
  {
    id: "2",
    name: "User",
    value: "user",
    permissions: [{ action: "can_get_user", label: "Can View Users" }],
  },
];

const RolePage = () => {
  const handleDelete = async (id: string) => {
    roles.filter((role) => role.id !== id);
  };

  return (
    <div className="flex flex-col gap-5 w-full  ">
      <div className=" w-full 2xl:w-3/4 self-center flex gap-y-10 justify-between md:flex-row">
        <PageTitle title="Roles" />
        <Link href="roles/add">
          <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] ">
            Add New
          </Button>
        </Link>
      </div>
      <Roles roles={roles} />
    </div>
  );
};

export default RolePage;
