"use client";
import PageTitle from "@/components/PageTitle";
import { CardContent} from "@/components/Card";
import ItemsCard from "@/components/invoices/detail/ItemsCard";
import MiddleCard from "@/components/invoices/detail/MiddleCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown,ArrowUp } from "lucide-react";
import {
  deleteInvoice,
  fetchInvoice,
  markInvoiceStatusPaid,
  markInvoiceStatusRead,
  markInvoiceStatusUnPaid,
} from "@/redux/actions/invoices";

type InvoiceProps = {
  status: any;
  date?: any;
  due_date?: any;
  invoice_number?: any;
  total_amount?: any;
  client?: any;
  line_items?: any;
};

export default function Detail({ params }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = params.id as string;
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchInvoice(id));
        setInvoice(response);
        console.log("res", response);
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
    <>
    <div id="top"/>
    <div className="flex flex-col gap-5  w-full">
      
        <PageTitle title="Reciept Details"/>
        <Button
          className="sm:h-[40px] h-[30px] w-[100px] bg-transparent border border-green-500 text-green-500 hover:bg-transparent"
        >
           <Link href={`/dashboard/reciepts/template/${id}`}>Actions</Link>
        </Button> 
      <section className="grid grid-cols-1  gap-4 transition-all">
        <CardContent className="grid grid-cols-2 gap-5">
          <section className="flex items-center gap-4">
            <p>Status</p>
            <p
              className={`${invoice?.status === "paid" && "text-green-400"} ${
                invoice?.status === "unpaid" && "text-red-400"
              } ${invoice?.status === "read" && "text-orange-400"}`}
            >
              {invoice?.status}
            </p>
          </section>
         
        </CardContent>
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-1">
        <CardContent className="flex justify-between gap-4">
          {invoice && (
            <MiddleCard
              email={invoice?.client?.email}
              name={invoice?.client?.name}
              invoice_number={invoice?.invoice_number}
              date={formattedDate}
              due_date={invoice?.due_date}
            />
          )}
        </CardContent>
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-1">
      
      <ItemsCard params={params}/>

        {invoice?.line_items && (
          <div className="flex justify-end">
            <section className="flex flex-col justify-end ">
              <hr className="w-[270px] h-[30px]" />
              <div className="flex items-center gap-[7rem]">
                <p> Total Amount($)</p>
                <p className="text-sm text-gray-400">{invoice?.total_amount}</p>
              </div>
            </section>
          </div>
        )}
      </section>
      <Button onClick={()=>window.scrollTo(0,0)} className="absolute bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400">
          <p><ArrowUp /></p> 
      </Button>
    </div>
    </>
  );
}
