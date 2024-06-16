"use client"
import { CardContent, CardProps } from "@/components/Card";
import RecentInvoiceActivitiesCard from "@/components/RecentActivitiesCard";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { fetchInvoices } from "@/redux/actions/invoices";

export type CustomerProps = {
  amount: any;
  discription: string;
  path: string;
  icon: any,
  label: "Total Customers",
};
export default function Recent() {

const [invoices, setInvoices] = useState<CardProps[] | null>(null);
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



return (
     
        <CardContent className="flex justify-between gap-4">
          <section>
            <p> Recent Activities</p>
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
  );
}
