'use client'

import React, { useEffect, useState } from 'react';
import ItemsCard from '../ItemsCard';
import TemplateForm from './Form';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { InvoiceProps } from './InvoiceProps';
import { fetchInvoice } from '@/redux/actions/invoices';

export default function InvoiceTemplateV2 ({ params }: any){
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

  const invoiceDate = new Date(invoice?.date);
  const originalDate = invoiceDate.toLocaleDateString();
  const [day, month, year] = originalDate.split('/');
  const formattedDate = `${year}-${month}-${day}`;


  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sample Invoice</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-2">Billed To</h2>
          {/* <p>Your Client</p>
          <p>1234 Clients Street</p>
          <p>City, California 90210</p>
          <p>United States</p>
          <p>1-888-123-8910</p> */}
                    <TemplateForm params={params}/>

        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Date Issued</h2>
          <p>{invoice?.date && formattedDate}</p>
          <h2 className="text-lg font-bold mb-2">Invoice Number</h2>
          <p>{invoice?.invoice_number}</p>
          <h2 className="text-lg font-bold mb-2">Amount Due</h2>
          <p>$1,699.48</p>
        </div>
      </div>

      <div className="mt-8">
      <ItemsCard params={params}   />
      </div>

      <div className="mt-8">
        <div className="flex justify-end">
          <div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>$1,798.39</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p>-$179.84</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p>$80.93</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>$1,699.48</p>
            </div>
            <div className="flex justify-between">
              <p>Deposit Requested</p>
              <p>$169.95</p>
            </div>
            <div className="flex justify-between">
              <p>Deposit Due</p>
              <p>$169.95</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}