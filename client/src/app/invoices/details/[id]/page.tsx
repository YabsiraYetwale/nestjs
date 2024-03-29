"use client"
import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import { SalesProps } from "@/components/SalesCard";
import ItemsCard from "@/components/detail/invoiceDetail/ItemsCard";
import MiddleCard, { MiddleCardProps } from "@/components/detail/invoiceDetail/MiddleCard";
import { Button} from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";


const uesrSalesData: SalesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00"
  },
];
const MiddleCardData: MiddleCardProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    invoice_number: 'LAO-128',
    date: "2023-01-15",
    due_date: "2025-03-22",
  },
];

export default function Home({id}) {
  const [isDelete, setIsDelete] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
const handleDelete = () => {
  setIsDelete(!isDelete);
};
const handlePopUp = () => {
  setIsPopUp(!isPopUp);
};
const handleConfirm = () => {
  setIsDelete(false);
};
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Invoice Details" />
    
      <section className="grid grid-cols-1  gap-4 transition-all">
        <CardContent className="grid grid-cols-2 gap-5">
          <section className="flex items-center gap-4">
            <p>Status</p>
            <p className=" text-red-400">
             Unpaid
            </p>
          </section>
          <div className="flex absolute right-[30rem] top-[20rem] bg-gray-200 z-10 flex-row justify-center items-center">
        {isDelete && (
          <CardContent className="w-[300px] flex flex-coljustify-center z-10 items-center">
            <>
            <div>Are Sou Sure To Delete</div>
            <div className="flex gap-5 flex-row justify-center items-center">
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 w-[100px]"
            >
              Yes
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-blue-600 hover:bg-blue-500 w-[100px]"
            >
              No
            </Button>
            </div>
            </>
          </CardContent>
        )}
      </div>
          <section  className="grid grid-cols-3 gap-5">
          <Button className="bg-blue-600 hover:bg-blue-500 w-[100px]">
          <Link href={`/invoices/edit/${id}`}>Edit</Link>
          </Button>
  
            <Button onClick={handleDelete} className='bg-red-600 hover:bg-red-500'>Delete</Button>
      
      <div className="flex flex-col gap-5">
          <Button onClick={handlePopUp} className='bg-green-600 hover:bg-green-500'>Mark as</Button>
         {
          isPopUp &&
         <div className="absolute top-[13rem] flex gap-5">
          {<Button className='bg-green-600 px-5 hover:bg-green-500'>Paid</Button>}
         {<Button className='bg-orange-600 px-5 hover:bg-orange-500'>Read</Button>}
          {isDelete && <Button className='bg-red-600 px-5 hover:bg-red-500'>UnPaid</Button>}
          </div>
          }
          </div>
          </section>
        </CardContent>
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-1">
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Activities</p>
            <p className="text-sm text-gray-400">
              You made 265 activities this month.
            </p>
          </section>
          {MiddleCardData.map((d, i) => (
            <MiddleCard
              key={i}
              email={d.email}
              name={d.name}
              invoice_number={d.invoice_number}
              date={d.date}
              due_date={d.due_date}
            />
          ))}
        </CardContent>
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-1">
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Activities</p>
            <p className="text-sm text-gray-400">
              You made 265 activities this month.
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <ItemsCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}        
   <Button className='w-[200px] bg-pink-400 hover:bg-rose-400'>Download Pdf</Button>
        </CardContent>
      </section>
    </div>
  );
}
