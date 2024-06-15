"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Bell } from "lucide-react";
import { CardProps } from "./Card";
import RecentInvoiceActivitiesCard from "./RecentActivitiesCard";
import { fetchInvoices } from "@/redux/actions/invoices";
import Link from "next/link";
import {useLocale } from 'next-intl';


export function NotificationPopup() {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState<CardProps[] | null>(null);

  const dispatch = useDispatch();
  const localActive = useLocale();

  const handleBellToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchInvoices());
        setInvoices(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div
        onClick={handleBellToggle}
        className={` ${
          invoices?.length ? "pl-2" : "pl-0"
        } flex h-10 w-10 items-center justify-center rounded-md cursor-pointer hover:bg-gray-200 `}
      >
        <Bell size={19} />
        {invoices?.length && (
          <div
            className={`pl-1 relative right-[8px] top-[-6px] h-[15px] w-[15px] text-white text-xs rounded-full flex justify-center items-center bg-red-600`}
          >{invoices?.length}</div>
        )}
      </div>
      {open && (
        <>
          <div className="absolute flex flex-col justify-between top-[66px] right-16 bg-white shadow-md w-96 h-48 rounded-b-lg">
            <div className="flex flex-col">
              {invoices?.slice(0, 3)?.map((invoice, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-5 py-1 hover:bg-white"
                >
                  <RecentInvoiceActivitiesCard
                    key={index}
                    email={invoice?.client?.email}
                    name={invoice?.client?.name}
                    total_amount={invoice.total_amount}
                  />
                </div>
              ))}
            </div>
            <Link
              onClick={() => setOpen(!open)}
              className="self-center text-gray-500 text-sm mb-2 hover:underline hover:text-gray-800 duration-100"
              href={`/${localActive}/dashboard/notifications`}
            >
              Notifications
            </Link>
          </div>
        </>
      )}
    </>
  );
}
