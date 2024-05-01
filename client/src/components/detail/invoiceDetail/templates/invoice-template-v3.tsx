"use client";
import React, { Component, useEffect, useState } from "react";
import TemplateForm from "./Form";
import { InvoiceProps } from "./InvoiceProps";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";
import ItemsCard from "../ItemsCard";


export default function InvoiceTemplateV3({ params }: any) {
  const id = params.id as string;
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
  console.log('consoleconsole')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchInvoice(id));
        setInvoice(response);
        console.log('consoleconsole',response)
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id, dispatch]);
  
  const invoiceDate = new Date(invoice?.date);
  const originalDate = invoiceDate.toLocaleDateString();
  const [day, month, year] = originalDate.split('/');
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div className="">
      {/* {header} */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
        </div>
      </div>
      {/* {invoice form} */}
        <div
          className=""
        >
          {/* image and invoice label*/}
          <div className="felx justify-between items-center ">
            {/* image */}
            <div className="flex justify-between ">
              <div className="flex items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-48 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-6 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Upload Logo</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG (MAX. 240x240px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
              <div className="flex items-center justify-center">
                <h1 className="text 4x1 uppercase font-semibold ">Invoice</h1>
              </div>
            </div>
          </div>
          {/* company Details */}
          <div className="flex flex-col w-1/2 mt-6">
            <div>
              <p>{invoice?.company?.name}</p>
            </div>
            <div>
              <p>{invoice?.company?.general_manager?._name}</p>
            </div>
            <div>
              <p>{invoice?.company?.country}</p>
            </div>
            <div>
              <p>{invoice?.company?.city},{invoice?.company?.woreda}</p>
            </div>
          </div>
          {/* client details */}
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2 mt-6">
              <h2 className="mb-2 font-semibold">Bill To</h2>
                        <TemplateForm params={params}/>

            </div>
            <div className="flex flex-col w-1/2 mt-6">
              <div className="flex gap-2">
                <div
                  className="h-7 text-base border-0 p-1 mb-2"                >
                  Invoice # :{ invoice?.invoice_number}

                </div>
              </div>
              <div className="flex gap-2">
                <div
                  className="h-7 text-base border-0 p-1 mb-2"
                >
                  Invoice Date : {invoice?.date && formattedDate}
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  className="h-7 text-base border-0 p-1 mb-2"
                >
                  Due Date : {invoice?.due_date}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Item Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tax
                  </th>
                  <th scope="col" className="px-6 py-3">
                    amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">10</td>
                  <td className="px-6 py-4">$2999</td>
                  <td className="px-6 py-4">$4000</td>

                </tr>
              </tbody>
            </table>
            <div className="total-section text-right mt-4 p-3">
              Subtotal: $11,850.90
              <br />
              VAT 10%: $1,185.09
              <br />
              Total: $13,035.99
              <br />
              Paid To Date: $8,366.50
              <br />
              Balance Due: $4,669.49
            </div>
          </div> */}
          


{/* <!-- table --> */}
 <div className="tablem relative overflow-x-auto shadow-md sm:rounded-lg my-6">
   <ItemsCard params={params}   />
    <div className="total-section text-right mt-4 p-3">
        Subtotal: $11,850.90<br />
        VAT 10%: $1,185.09<br />
        Total: $13,035.99<br />
        Paid To Date: $8,366.50<br />
        Balance Due: $4,669.49
      </div>
</div>

        </div>
    </div>
  );
}
