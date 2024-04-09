"use client";
import { ReactToPrint } from "react-to-print";
import { CardContent } from "@/components/Card";
import ItemsCard from "@/components/detail/invoiceDetail/ItemsCard";
import MiddleCard from "@/components/detail/invoiceDetail/MiddleCard";
import { useEffect, useState , useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";

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
  const [isAction, setIsAction] = useState(false);
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
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button
          onClick={() => setIsAction(!isAction)}
          className="sm:h-[40px] h-[30px] bg-transparent border border-green-500 text-green-500 hover:bg-transparent"
        >
          Actions
        </Button>

        {isAction && (
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
        )}
      </div>
      <div>
        <div
          ref={componentRef}
          className={isAction ? "actual-receipt" : "actual-receipt hidden" }
        >
          <div className="flex flex-col gap-5 w-full">
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
              <CardContent className="w-[200px]">
                <section className="flex items-center gap-4">
                  <p className="transform-rotate(270deg)">Status</p>
                  <p
                    className={`${
                      invoice?.status === "paid" && "text-green-400"
                    } ${invoice?.status === "unpaid" && "text-red-400"} ${
                      invoice?.status === "read" && "text-orange-400"
                    }`}
                  >
                    {invoice?.status}
                  </p>
                </section>
              </CardContent>
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-1">
              <CardContent className="flex justify-between gap-4">
                {invoice && (
                  <MiddleCard
                    email={invoice?.client?.email}
                    name={invoice?.client?.name}
                    invoice_number={invoice?.invoice_number}
                    date={invoice?.date}
                    due_date={invoice?.due_date}
                  />
                )}
              </CardContent>
            </section>
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-1">
              <ItemsCard params={params} />

              {invoice?.line_items && (
                <div className="flex justify-end">
                  <section className="flex flex-col justify-end ">
                    <hr className="w-[270px] h-[30px]" />
                    <div className="flex items-center gap-[7rem]">
                      <p>Total Amount</p>
                      <p className="text-sm text-gray-400">
                        {invoice?.total_amount}
                      </p>
                    </div>
                  </section>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

