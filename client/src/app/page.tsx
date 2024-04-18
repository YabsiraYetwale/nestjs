"use client"
import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import RecentInvoiceActivitiesCard from "@/components/RecentActivitiesCard";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { fetchInvoices } from "@/redux/actions/invoices";
import { fetchCustomers } from "@/redux/actions/customers";
import Link from "next/link";

export type CustomerProps = {
  amount: any;
  discription: string;
  path: string;
  icon: any,
  label: "Total Customers",
};
export default function Home() {

  const [invoices, setInvoices] = useState<CardProps[] | null>(null);
  const [customers, setCustomers] = useState<CardProps[] | null>(null);
const dispatch = useDispatch();

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
      const response = await dispatch<any>(fetchCustomers());
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
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 lg:grid-cols-4">
        {<>
      
          <Card
            amount={`$${totalReveneAmount}`}
            icon={DollarSign}
            label={"Total Revenue"}
          />
          <Card
            amount={customers?.length}
            icon={Users}
            label={"Total Customers"}
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
            label={"Status"}
          />
          
     </>}
     
      </section>
      <section className="grid  lg:grid-cols-2 grid-cols-1 gap-4 gap-4 transition-all">
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Activities</p>
            <p className="text-sm text-gray-400">
              Most recent activities in this month.
            </p>
          </section>

          {invoices?.slice(0,3)?.map((d, i) => (
            <RecentInvoiceActivitiesCard
              key={i}
              email={d?.client?.email}
              name={d?.client?.name}
              total_amount={d.total_amount}
            />
          ))}
        </CardContent>
        <CardContent className="flex flex-col justify-between">
          <section className="flex flex-col gap-5">
            <h2 className="font-bold">Quick access</h2>
            <div className="flex flex-col gap-3 text-blue-600">
            <Link href="/invoices/addInvoice" className="hover:underline">create new invoices</Link>
            <Link href="/customers" className="hover:underline">manage customers</Link>
            <Link href="/invoices" className="hover:underline">view invoice status</Link>
            </div>
          </section>
        </CardContent>
      </section>
    </div>
  );
}
