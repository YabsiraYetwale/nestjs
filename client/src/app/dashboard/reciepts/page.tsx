import React from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Goup from "@/components/customers/Goup";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Reciepts from "@/components/reciepts/Reciepts";

export default function RecieptsPage() {
 

  return (
    <>
    <ProtectedRoute>
      <div className="flex flex-col justify-evenly">
        <div className="flex sm:gap-[9rem] gap-[15rem]">
          <PageTitle title='Reciepts' />
        </div>
        <Reciepts/>
      </div>
      <Goup />
    </ProtectedRoute>
    </>
  );
}
