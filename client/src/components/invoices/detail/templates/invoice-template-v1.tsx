import { fetchInvoice } from '@/redux/actions/invoices';
import React, { useEffect, useState } from 'react';
import ItemsCard from '../ItemsCard';
import TemplateForm from './Form';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { InvoiceProps } from '../../../schemas/InvoiceProps';
import Image from 'next/image';
import CustomFieldsForm2 from './CustomFieldsForm2';
import CustomFieldsForm1 from './CustomFieldsForm1';

const InvoiceTemplateV1 = ({ params }: any) => {
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
      <div className="header flex justify-between">
        <div className="company-logo">
          {/* <img className="logo w-20" src="https://via.placeholder.com/150" alt="Company Logo" /> */}
          <img className="logo w-20" src={invoice?.company?.company_logo} alt="Company Logo" />
          {/* <Image src={invoice?.company?.company_logo} width={500} height={300} alt="My Image" /> */}
        <p>logo- {invoice?.company?.company_logo}</p>
        </div>
        <div className="from-container text-right pt-2 bg-origin-padding">
          <p>
            {invoice?.company?.name}:<br />
            {invoice?.company?.country}<br />
            {invoice?.company?.city},{invoice?.company?.kebele} <br />
            {invoice?.company?.fax}<br />
            {invoice?.company?.woreda}<br />
            {invoice?.company?.tel1}
          </p>
          <CustomFieldsForm1 params={params}/>
        </div>
      </div>

      <div className="to-info flex justify-between">
        <div className="to-container">
          <p>
            Billed To:<br />
            {/* your client <br />
            1234 your street<br />
            city,california <br />
            90209<br />
            united states<br />
            1-888-777-9998 */}
          </p>
          <TemplateForm params={params}/>
          <CustomFieldsForm2 params={params}/>

        </div>
        <div className="info-container flex flex-wrap-reverse  justify-betweenmb-4 mt-3 ">
          <div id="date-issued" className="mb-4 p-3">
            <p>
              <strong>Date issued</strong><br />
              {invoice?.date && formattedDate}
            </p>
          </div>
          <div id="invoice-number" className="mb-4 p-3">
            <p>
              <strong>invoice number</strong> <br />
              {invoice?.invoice_number}
            </p>
          </div>
          <div id="amount due" className="mb-4 p-3">
            <p>
              <strong>Amount Due</strong> <br />
              $1,699.48
            </p>
          </div>
          <div id="due-date" className="mb-4 p-3">
            <p>
              <strong>Due Date</strong><br />
              {invoice?.due_date}
            </p>
          </div>
        </div>
      </div>

      <ItemsCard params={params}   />

      <div className="total-section text-right mt-4">
        Subtotal: $11,850.90<br />
        VAT 10%: $1,185.09<br />
        Total: $13,035.99<br />
        Paid To Date: $8,366.50<br />
        Balance Due: $4,669.49
      </div>
      <div className="invoice-btns flex justify-center mt-6">
      </div>
    </div>
  );
};

export default InvoiceTemplateV1;