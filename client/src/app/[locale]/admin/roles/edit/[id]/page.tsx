import RoleForm from "@/components/form/RoleForm";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { roles } from "../../page";
import Role from "@/models/role";

interface Props {
  params: {
    id: string;
  };
}

const EditRolePage = ({ params: { id } }: Props) => {
  const handleSubmit = async () => {
    "use server";
  };

  const role: Role = roles.filter((role) => role.id === id)[0];

  return (
    <div className="w-full max-w-2xl flex flex-col gap-5 ">
      <PageTitle title="Edit Role" />
      <RoleForm onSubmit={handleSubmit} role={role} />
    </div>
  );
};

export default EditRolePage;
