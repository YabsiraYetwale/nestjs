import React, { useEffect, useState } from 'react'
import ItemsCard from '../ItemsCard'
import TemplateForm from './Form'
import { InvoiceProps } from "./InvoiceProps";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";


export default function InvoiceTemplateV4({ params }: any) {
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
      <div className="">
      <div className="flex justify-between items-center pb-10 border-b">
      <img className="w-24 h-24" src={invoice?.company?.company_logo} alt="Company Logo" />

        {/* <img src="/logo.png" alt="Company Logo" className="w-24 h-24" /> */}
        <div className="text-right">
          <h3 className="text-blue-600 font-semibold text-2xl">Invoice</h3>
        </div>
      </div>
      {/* Sender and Receiver Address */}
      <div className="flex justify-between items-start py-10 border-b text-black">
        <div>
          <h4 className="text-blue-600 font-semibold text-xl">Sender</h4>
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
        <div>
          <h4 className="text-blue-600 font-semibold text-xl">Receiver</h4>
          {/* <p>Receiver Name</p>
          <p>Receiver Street</p>
          <p>Receiver City, Receiver State, Receiver Zip</p> */}
                    <TemplateForm params={params}/>

        </div>
      </div>
      <div className="invoice-body">
      <ItemsCard params={params}   />
    <div className="text-right mt-4 text-black">
        <p>Subtotal: $Subtotal</p>
        <p>VAT 10%: $VAT</p>
        <p>Total: $Total</p>
        <p>Paid To Date: $PaidToDate</p>
        <p>Balance Due: $BalanceDue</p>
    </div>
</div>
    </div>
    </div>
  )
}
