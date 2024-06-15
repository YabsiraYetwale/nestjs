"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CompanyForm from "@/components/form/CompanyForm";
import companySchema from "@/schemas/company";
import useSignUpStore from "@/state-management/sign-up/store";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

const NewCompanyPage = () => {
  const { user } = useSignUpStore();
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (values: z.infer<typeof companySchema>) => {
    //api-call
    setIsSending(true);
    setError("");
    axios
      .post(
        "https://invoicesystm-app.onrender.com/api/companies",
        {
          users: user,
          ...values,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => setIsSending(false))
      .catch((error: AxiosError) => {
        setError(error.message);
        setIsSending(false);
      });
  };
  const handleCancel = () => {
    router.back();
  };

  if (error) {
    toast.error(error);
    setError("");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p className="text-xl">Add Your Company</p>
        <hr />
      </div>
      <CompanyForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSending={isSending}
      />
      <ToastContainer />
    </div>
  );
};

export default NewCompanyPage;
