"use client";
import { ArrowUp,User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardContent } from "../../Card";
import { Button } from "../../ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteCustomer, fetchCustomer } from "@/redux/actions/customers";
import InvoiceCard from "./invoicesCard";
import {useLocale } from 'next-intl';

type CustomerProps = {
  name: string;
  phone: string;
  email: string;
  contact_person:string;
  billing_address:string;
  invoices:any;
};

export default function CustomerDetail({ params }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const localActive = useLocale();
  const id = params.id as string;
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isOverView, setIsOverView] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCustomer(id));
        setCustomer(response);
        console.log("resop", response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id,dispatch]);

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  const handleConfirm = () => {
    dispatch<any>(deleteCustomer(id,router,localActive))
  };
  return (
    <>
    <div className='flex flex-col gap-[120px]'>
      <section className="flex gap-5">
        <div className=" h-20 w-20 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User />
        </div>
        <section className="flex flex-col gap-[5rem] py-[20px]">
          <div className="flex flex-col">
            <div className="font-bold text-[20px] text-gray-600">
             {customer?.name}
            </div>
            <p className="text-sm text-gray-400">Customer in Invoice system.</p>
          </div>
          <section className="flex flex-col gap-5 relative sm:left-0 left-[-4.5rem]">
          <div className="flex gap-5">
          <div onClick={()=>setIsOverView(true)} className={`${isOverView && "underline"} font-bold text-[20px] ${isOverView? "text-gray-600":"text-gray-400"}  cursor-pointer`}>
          {localActive === "en" ? "OverView" : "አጠቃላይ እይታ"} 
            </div>
          <div onClick={()=>setIsOverView(false)} className={`${!isOverView && "underline"} font-bold text-[20px] ${!isOverView? "text-gray-600":"text-gray-400"}  cursor-pointer`}>
          {localActive === "en" ? "Invoices" : "ደረሰኞች"}
            </div>
          </div>
          <>
            {isOverView &&
            <>
            <div className="grid grid-cols-2  md:gap-[300px] gap-5 sm:gap-5  lg:gap-[400px]">
              <div className="flex flex-col gap-2 ">
                <div className="font-bold text-gray-400">{localActive === "en" ? "Phone Number" : "ስልክ ቁጥር"}</div>
                <p className="text-sm text-gray-400">{customer?.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-bold text-gray-400">{localActive === "en" ? "Email Address" : "ኢሜል አድራሻ"}</div>
                <p className="text-sm text-gray-400">{customer?.email}</p>
              </div>
            </div>
            <div className="flex gap-5 justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="font-bold text-gray-400">{localActive === "en" ? "Contact Person" : "የእውቂያ ሰው"}</div>
                <p className="text-sm text-gray-400">{customer?.contact_person}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-bold text-gray-400">{localActive === "en" ? "Billing Address" : "የክፍያ አድራሻ"}</div>
                <p className="text-sm text-gray-400">
                  {customer?.billing_address}
                </p>
              </div>
            </div>
            </>
            }
            {!isOverView &&
            <>
            <InvoiceCard params={params}/>
            </>}
            </>
          </section>
        </section>
      </section>
   <div className="flex absolute lg:right-[30rem] top-[20rem] bg-gray-200  flex-row justify-center items-center">
        {isDelete && (
          <CardContent className="w-[300px] flex flex-coljustify-center  items-center">
            <>
            <div>{localActive === "en" ? "Are Sou Sure To Delete" : "ለመሰረዝ እርግጠኛ ነዎት"}</div>
            <div className="flex gap-5 flex-row justify-center items-center">
            <Button
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-500 w-[100px]"
            >
              {localActive === "en" ? "Yes" : "አዎ"}
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-blue-600 hover:bg-blue-500 w-[100px]"
            >
              {localActive === "en" ? "No" : "የለም"}
            </Button>
            </div>
            </>
          </CardContent>
        )}
      </div>
      <CardContent className="flex flex-row justify-between">
        <Link href={`/${localActive}/customers/edit/${id}`}>
          <Button className="bg-blue-600 hover:bg-blue-500 w-[100px]">
            {localActive === "en" ? "Edit" : "አሻሽል"}
          </Button>
        </Link>
        <Button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-500 w-[100px]"
        >
          {localActive === "en" ? "Delete" : "ሰርዝ"}
        </Button>
      </CardContent>
    </div>
       <Button onClick={()=>window.scrollTo(0,0)} className="absolute bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400">
       <p><ArrowUp /></p> 
   </Button>
   </>
  );
}
