"use client"
import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Bell} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardProps } from "./Card";
import RecentInvoiceActivitiesCard from "./RecentActivitiesCard";
import { fetchInvoices } from "@/redux/actions/invoices";

export function Notification() {

       

  const [open, setOpen] = React.useState(false);
  
  const [invoices, setInvoices] = useState<CardProps[] | null>(null);
const dispatch = useDispatch();
const handleClose = () => setOpen(false);
const handleOpen = () => 
{
   setOpen(true);
}

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
    <>
      <div onClick={handleOpen} className="flex cursor-pointer absolute top-[-130px] left-[45rem]">
                <Bell/>
                 <div className=" relative left-[-10px] top-[-6px] h-[20px] w-[17px] text-white rounded-full flex justify-center items-center bg-red-600">
                  3
                </div>
           </div>
    {open &&
    <CardContent className="bg-gray-300 flex flex-col justify-center items-center">
        <div className="cursor-pointer w-[500px] flex flex-col justify-between gap-4">
          {invoices?.slice(0,3)?.map((d, i) => (
        <div key={i} className="cursor-pointer px-5 py-1 hover:bg-white">
            <RecentInvoiceActivitiesCard
              key={i}
              email={d?.client?.email}
              name={d?.client?.name}
              total_amount={d.total_amount}
            />
            </div>
          ))}
           
        </div>
        <Button onClick={handleClose} className="w-[50px] bg-blue-600 hover:bg-blue-500">
            OK
          </Button>
      </CardContent>
}
      </>
    
  );
}
