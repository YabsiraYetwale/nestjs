"use client";
import React, { Component, useEffect, useState } from "react";
import { HandMetal } from "lucide-react";
import TemplateForm from "./Form";
import ItemsCard from "../ItemsCard";
import { fetchInvoice } from "@/redux/actions/invoices";
import { InvoiceProps } from "./InvoiceProps";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
export default function InvoiceTemplateV5({ params }: any) {
  const id = params.id as string;
  const dispatch = useDispatch();
  const router = useRouter();
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchInvoice(id));
        setInvoice(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id, dispatch]);

  return (
    <>
    <div className="">
      <div>
        <div>
        <div
          className=""
        >
          <div className="flex flex-col gap-10 w-full">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center text-blue-500 ">
          <h1 className="3xl font-semibold">
          <div
              className="flex p-2 bg-opacity-20 text-lg lg:text-2xl font-bold drop-shadow-md"
            >
              <span className="text-green-500 dark:text-green-400  ">
                Invoice
              </span>
              <span className="text-blue-500 dark:text-yellow-400">Systm</span>
            </div>
            </h1>
            <HandMetal />
            </div>
            <div className="flex flex-col gap-3">
            <span className="bg-opacity-20 text-lg lg:text-2xl font-bold drop-shadow-md">
                Invoice
            </span>
            <div className="flex flex-col">
            <span><strong>Invoice Number: </strong><span className="font-light">{invoice?.invoice_number }</span> </span>
            <span><strong>Billing Date: </strong><span className="font-light">{invoice?.due_date}</span> </span>
            <span><strong>Due Date: </strong><span className="font-light">{invoice?.due_date}</span></span>
            </div>
            </div>
          </div>
          <div className="flex justify-around gap-5">
            <div className="flex flex-col gap-3">
              <strong>Company Information<hr/></strong>
              <span> {invoice?.company?.name}</span>
              <span>{invoice?.company?.kebele}</span> 
              <span>Company No: {invoice?.company?.company_number}</span> 
              <span>Company Vat: {invoice?.company?.vat_reg_number}</span>  
            </div>
            <div className="flex flex-col gap-3">
              <strong>Billing To<hr/></strong>
              {/* <span>'templateVersion?.client?.name'</span>
              <span>'templateVersion?.client?.billing_address'</span>
              <span>'templateVersion?.client?.email'</span>
              <span>'templateVersion?.client?.phone'</span> */}
                        <TemplateForm params={params}/>

            </div>
            <div className="flex flex-col gap-3">
              <strong>Shipping To<hr/></strong>
              <span>{invoice?.client?.name}</span>
              <span>{invoice?.client?.shipping_address}</span>
              <span>{invoice?.client?.shipping_state}</span>
              <span>{invoice?.client?.shipping_zip}</span>
            </div>
            <div>
            </div>
          </div>
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-1">
            <ItemsCard params={params}   />
                <div className="flex justify-end">
                  <section className="flex flex-col justify-end ">
                    <hr className="w-[270px] h-[30px]" />
                    <div className="flex items-center gap-[7rem]">
                      <p>Total Amount($)</p>
                      <p className="text-sm text-gray-400">
                        {invoice?.total_amount}
                      </p>
                    </div>
                  </section>
                </div>
            </section>
            <div className="roar w-[110px] border relative top-[-80px] transform rotate-[-40deg] uppercase flex items-center  p-2 bg-opacity-20 text-lg lg:text-2xl font-bold drop-shadow-md">
              {invoice?.status}
              </div>
          </div>
        </div>
        </div>
      </div>
    </div>
</>
  );
}
