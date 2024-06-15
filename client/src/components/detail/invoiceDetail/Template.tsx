"use client";
import { ReactToPrint } from "react-to-print";
import ItemsCard from "@/components/detail/invoiceDetail/ItemsCard";
import { useEffect, useState , useRef } from "react";
import { ArrowUp,HandMetal  } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/Card";

type InvoiceProps = {
  status: any;
  date?: any;
  due_date?: any;
  invoice_number?: any;
  total_amount?: any;
  client?: any;
  line_items?: any;
};

export default function Template({ params }: any) {
  const [loader, setLoader] = useState(false);
  const componentRef = useRef(null);
 const dispatch = useDispatch();
  const id = params.id as string;
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

  return (
    <>
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
          <div className="flex gap-4">
            <ReactToPrint
              trigger={() => {
                return (
            <Button
              disabled={loader}
              className="bg-transparent border border-pink-400 text-pink-400 hover:bg-transparent"
            >
              {loader ? <span>Downloading</span> : <span>Download/Print Pdf</span>}
            </Button>
                )}}
             content={() =>componentRef.current}
             pageStyle="print"
            />
            <Button className="bg-transparent border border-pink-400 text-pink-400 hover:bg-transparent">
              Email
            </Button>
          </div>
      </div>
      <div>
        <CardContent>
        <div
          ref={componentRef}
          className="actual-receipt"
        >
          <div className="flex flex-col gap-10 w-full">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center text-blue-500 ">
          <h1 className="3xl font-semibold">
          <div
              className="flex p-2 bg-opacity-20 text-lg lg:text-2xl font-bold drop-shadow-md"
            >
              <span className="text-green-500 dark:text-green-400  ">
                Invoice
              </span>
              <span className="text-blue-500 dark:text-yellow-400">Systm</span>
            </div>
            </h1>
            <HandMetal />
            </div>
            <div className="flex flex-col gap-3">
            <span className="bg-opacity-20 text-lg lg:text-2xl font-bold drop-shadow-md">
                Invoice
            </span>
            <div className="flex flex-col">
            <span><strong>Invoice Number: </strong><span className="font-light">{invoice?.invoice_number}</span> </span>
            <span><strong>Billing Date: </strong><span className="font-light">{invoice?.due_date}</span> </span>
            <span><strong>Due Date: </strong><span className="font-light">{invoice?.due_date}</span></span>
            </div>
            </div>
          </div>
          <div className="flex justify-around gap-5">
            <div className="flex flex-col gap-3">
              <strong>Company Information<hr/></strong>
              <span> InvoiceSystm</span>
              <span>{invoice?.client?.billing_address}</span>
              <span>Company No: 69940000</span>
              <span>Company Vat: 69000007</span>
            </div>
            <div className="flex flex-col gap-3">
              <strong>Billing To<hr/></strong>
              <span>{invoice?.client?.name}</span>
              <span>{invoice?.client?.billing_address}</span>
              <span>{invoice?.client?.email}</span>
              <span>{invoice?.client?.phone}</span>
            </div>
            <div className="flex flex-col gap-3">
              <strong>Shipping To<hr/></strong>
              <span>{invoice?.client?.name}</span>
              <span>{invoice?.client?.shipping_address}</span>
              <span>{invoice?.client?.shipping_state}</span>
              <span>{invoice?.client?.shipping_zip}</span>
            </div>
            <div>
            </div>
          </div>
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-1">
              <ItemsCard params={params} />
              {invoice?.line_items && (
                <div className="flex justify-end">
                  <section className="flex flex-col justify-end ">
                    <hr className="w-[270px] h-[30px]" />
                    <div className="flex items-center gap-[7rem]">
                      <p>Total Amount($)</p>
                      <p className="text-sm text-gray-400">
                        {invoice?.total_amount}
                      </p>
                    </div>
                  </section>
                </div>
              )}
            </section>
            <CardContent className="w-[100px] border roar flex items-center  p-2 bg-opacity-20 text-lg lg:text-2xl font-bold drop-shadow-md">
              {invoice?.status}
              </CardContent>
          </div>
        </div>
        </CardContent>
      </div>
    </div>
      <Button onClick={()=>window.scrollTo(0,0)} className="absolute bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400">
      <p><ArrowUp /></p> 
  </Button>
  </>
  );
}

