"use client";

import React from "react";
import { Bell } from "lucide-react";
import RecentInvoiceActivitiesCard from "./RecentActivitiesCard";

import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useInvoices from "@/hooks/useInvoices";
import { invoices } from "@/redux/reducers/invoices";
import { Invoice } from "@/models/invoice";

interface Props {
  isAdmin?: boolean;
}

export function NotificationPopup({ isAdmin }: Props) {
  // const { invoices } = useInvoices();

  const invoices: Invoice[] = [
    {
      id: "1",
      invoice_number: "",
      date: "",
      due_date: "",
      total_amount: "3",
      status: "paid",
      company_id: "",
      client_id: "",
      creator: {
        id: "",
        email: "",
        company_id: "",
      },
      line_items: [],
      isRead: false,
      client: {
        id: "",
        name: "Mathias Wakgari",
        email: "mathiaswakgari@gmail.com",
        billing_address: "",
        contact_person: "",
        phone: "",
        shipping_address: "",
        shipping_city: "",
        shipping_country: "",
        shipping_state: "",
        shipping_zip: "",
      },
    },
    {
      id: "2",
      invoice_number: "",
      date: "",
      due_date: "",
      total_amount: "10",
      status: "paid",
      company_id: "",
      client_id: "",
      creator: {
        id: "",
        email: "",
        company_id: "",
      },
      line_items: [],
      isRead: false,
      client: {
        id: "",
        name: "Mathias Wakgari",
        email: "mathiaswakgari@gmail.com",
        billing_address: "",
        contact_person: "",
        phone: "",
        shipping_address: "",
        shipping_city: "",
        shipping_country: "",
        shipping_state: "",
        shipping_zip: "",
      },
    },
    {
      id: "3",
      invoice_number: "",
      date: "",
      due_date: "",
      total_amount: "323",
      status: "paid",
      company_id: "",
      client_id: "",
      creator: {
        id: "",
        email: "",
        company_id: "",
      },
      line_items: [],
      isRead: false,
      client: {
        id: "",
        name: "Mathias Wakgari",
        email: "mathiaswakgari@gmail.com",
        billing_address: "",
        contact_person: "",
        phone: "",
        shipping_address: "",
        shipping_city: "",
        shipping_country: "",
        shipping_state: "",
        shipping_zip: "",
      },
    },
  ];

  return (
    <Popover>
      <PopoverTrigger>
        <Bell size={19} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-96 mr-5">
        <div className="h-48 mb-5 flex flex-col gap-1 overflow-y-auto">
          {invoices?.map((invoice) => (
            <RecentInvoiceActivitiesCard
              key={invoice.id}
              email={invoice.client.email}
              name={invoice.client.name}
              total_amount={invoice.total_amount}
            />
          ))}
        </div>

        <Link
          className="self-center text-gray-500 text-sm mb-2 hover:underline hover:text-gray-800 duration-100"
          href={isAdmin ? "/admin/notifications" : "/dashboard/notifications"}
        >
          Notifications
        </Link>
      </PopoverContent>
    </Popover>
  );
}
