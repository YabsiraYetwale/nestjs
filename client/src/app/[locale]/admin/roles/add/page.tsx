import RoleForm from "@/components/form/RoleForm";
import PageTitle from "@/components/PageTitle";
import roleSchema from "@/schemas/role";
import React from "react";
import { z } from "zod";

const AddRolePage = () => {
  const handleSubmit = async (values: z.infer<typeof roleSchema>) => {
    "use server";
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-5 ">
      <PageTitle title="Add role" />
      <RoleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddRolePage;
