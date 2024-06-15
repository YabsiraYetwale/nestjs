"use client";

import { CardContent } from "@/components/Card";
import ItemsCard from "@/components/invoices/detail/ItemsCard";
import { Skeleton } from "@/components/ui/skeleton";
import apiClient from "@/services/api-client";
import React, { useEffect, useState } from "react";
import * as invoiceModel from "@/models/invoice";

interface Props {
  id: string;
}

interface FetchInvoice {
  invoice: invoiceModel.Invoice;
}

const Invoice = ({ id }: Props) => {
  const [invoice, setInvoice] = useState<invoiceModel.Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<FetchInvoice>(`/invoices/${id}`);

        setInvoice(response.data.invoice);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <CardContent className="flex flex-col items-center md:flex-row md:gap-5 md:justify-between lg:px-10">
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <p className="flex items-center gap-x-1">
            Invoice Number:
            {isLoading ? (
              <Skeleton className="h-4 rounded-none bg-gray-300 w-48 inline-block" />
            ) : (
              <span className="text-gray-600">{invoice?.invoice_number}</span>
            )}
          </p>
          <p className="flex items-center gap-x-1">
            Date:
            {isLoading ? (
              <Skeleton className="h-4 rounded-none bg-gray-300 w-48 inline-block" />
            ) : (
              <span className="text-gray-600">{invoice?.date}</span>
            )}
          </p>
          <p className="flex items-center gap-x-1">
            Due Date:
            {isLoading ? (
              <Skeleton className="h-4 rounded-none bg-gray-300 w-48 inline-block" />
            ) : (
              <span className="text-gray-600">{invoice?.due_date}</span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <p className="flex items-center gap-x-1">
            Status:
            {isLoading ? (
              <Skeleton className="h-4 rounded-none bg-gray-300 w-48 inline-block" />
            ) : (
              <span className="text-gray-600">{invoice?.status}</span>
            )}
          </p>
          <p className="flex items-center gap-x-1">
            Name:
            {isLoading ? (
              <Skeleton className="h-4 rounded-none bg-gray-300 w-48 inline-block" />
            ) : (
              <span className="text-gray-600">{invoice?.client.name}</span>
            )}
          </p>
          <p className="flex items-center gap-x-1">
            Email:
            {isLoading ? (
              <Skeleton className="h-4 rounded-none bg-gray-300 w-48 inline-block" />
            ) : (
              <span className="text-gray-600">{invoice?.client.email}</span>
            )}
          </p>
        </div>
      </CardContent>

      <div className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-1">
        {isLoading ? (
          <Skeleton className="h-72 bg-gray-300" />
        ) : (
          <ItemsCard params={{ id }} />
        )}

        {invoice?.line_items && (
          <div className="flex justify-end">
            <div className="flex flex-col justify-end items-end ">
              <hr className="w-[270px] h-[30px]" />
              <p className="text-gray-700 flex items-center">
                Total Amount($):{" "}
                {isLoading ? (
                  <Skeleton className="bg-gray-300 h-8 inline-block w-24" />
                ) : (
                  <span className="font-bold">${invoice?.total_amount}</span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Invoice;
