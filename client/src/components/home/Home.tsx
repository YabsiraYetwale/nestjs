"use client"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, {CardProps } from "@/components/Card";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
// import {useLocale } from 'next-intl';
import { fetchInvoices } from "@/redux/actions/invoices";
import { fetchCustomers } from "@/redux/actions/customers";

export type CustomerProps = {
  amount: any;
  discription: string;
  path: string;
  icon: any,
  label: "Total Customers",
};
export default function Dash() {

  const [invoices, setInvoices] = useState<CardProps[] | null>(null);
  const [customers, setCustomers] = useState<CardProps[] | null>(null);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const localActive = 'useLocale()';



useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch<any>(fetchInvoices());
      setInvoices(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, [dispatch]);

useEffect(() => {
  const fetchData = async () => {
      const response = await dispatch<any>(fetchCustomers(search));
      setCustomers(response);
  };
  fetchData();
}, [dispatch]);
const totalRevene = invoices?.filter(invoice => invoice?.status === 'paid');
const outstandingInvoices = invoices?.filter(invoice => invoice?.status === 'unpaid');
const readInvoices = invoices?.filter(invoice => invoice?.status === 'read');

const totalOutstandingAmount = outstandingInvoices?.reduce((total, invoice) => total + parseFloat(invoice.total_amount), 0);
const totalReveneAmount = totalRevene?.reduce((total, invoice) => total + parseFloat(invoice.total_amount), 0);

return (
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 lg:grid-cols-4">
        {<>
      
          <Card
            amount={`$${totalReveneAmount}`}
            icon={DollarSign}
            label={localActive === "en" ? "Total Revenue" : "ጠቅላላ ገቢ"}
          />
          
          <Card
            amount={customers?.length}
            icon={Users}
            label={localActive === "en" ? "Total Customers" : "ጠቅላላ ደንበኞች"}
          />
          <Card
            amount={`$${totalOutstandingAmount}`}
            icon={CreditCard}
            label={"Outstanding Invoices"}
          />
          <Card
            status1={`${outstandingInvoices?.length} UnPaid`}
            status2={`${totalRevene?.length} Paid`}
            status3={`${readInvoices?.length} Read`}
            icon={Activity}
            label={localActive === "en" ? "Status" : "ሁኔታ"}
          />
          
     </>}
      </section>
          );
}
