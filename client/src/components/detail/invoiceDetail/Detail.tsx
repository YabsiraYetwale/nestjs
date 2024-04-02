"use client";
import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import { SalesProps } from "@/components/SalesCard";
import ItemsCard from "@/components/detail/invoiceDetail/ItemsCard";
import MiddleCard, {
  MiddleCardProps,
} from "@/components/detail/invoiceDetail/MiddleCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import { deleteInvoice, fetchInvoice, fetchInvoices, markInvoiceStatusPaid, markInvoiceStatusRead, markInvoiceStatusUnPaid } from "@/redux/actions/invoices";

type InvoiceProps = {
    name: any;
    status: any;
    date: any;
    due_date: any;
    invoice_number:any;
  };
const uesrSalesData: SalesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00",
  },
];

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
        const response = await dispatch(fetchInvoice(id));
        setInvoice(response);
        console.log("res", response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id,dispatch]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = () => {
    setIsDelete(!isDelete);
  };
  const handlePopUp = () => {
    setIsPopUp(!isPopUp);
  };
  const handleConfirm = () => {
    dispatch(deleteInvoice(id,router))
  };

// const handlePaid = async () => {
//   await dispatch(markInvoiceStatusPaid(id));
//   setInvoice((prevInvoice) => ({ ...prevInvoice, status: 'paid' }));
//   setIsPopUp(false)
// };
const handlePaid = async () => {
    await dispatch(markInvoiceStatusPaid(id));
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      status: 'paid',
      name: prevInvoice?.name as String,
      date: prevInvoice?.date as String,
      due_date: prevInvoice?.due_date as String,
      invoice_number:prevInvoice?.invoice_number as String,
    }));
    setIsPopUp(false);
  };

const handleUnPaid = async () => {
  await dispatch(markInvoiceStatusUnPaid(id));
  setInvoice((prevInvoice) => ({ 
    ...prevInvoice, 
    status: 'unpaid',
    name: prevInvoice?.name as String,
    date: prevInvoice?.date as String,
    due_date: prevInvoice?.due_date as String,
    invoice_number:prevInvoice?.invoice_number as String,
}));
  setIsPopUp(false)
};

const handleRead = async () => {
  await dispatch(markInvoiceStatusRead(id));
  setInvoice((prevInvoice) => ({ 
    ...prevInvoice,
     status: 'read',
     name: prevInvoice?.name as String,
    date: prevInvoice?.date as String,
    due_date: prevInvoice?.due_date as String,
    invoice_number:prevInvoice?.invoice_number as String, 
    }));
  setIsPopUp(false)
};

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Invoice Details" />
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
          <div className="flex flex-col items-center justify-between p-4 cursor-pointer">
            <div onClick={toggleAccordion} className="text-gray-500 sm:hidden">
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            <section
              className={`sm:grid ${
                isOpen ? "grid" : "hidden"
              } sm:grid-cols-3 grid-cols-1 lg:gap-5 gap-3`}
            >
              <Button className="bg-blue-600 sm:h-[40px] h-[30px] hover:bg-blue-500">
                <Link href={`/invoices/edit/${id}`}>Edit</Link>
              </Button>

              <Button
                onClick={handleDelete}
                className="sm:h-[40px] h-[30px] bg-red-600 hover:bg-red-500"
              >
                Delete
              </Button>
              <div className="flex absolute lg:right-[30rem] right-[3rem] top-[20rem] top-[15rem]  bg-gray-200 flex-row justify-center items-center">
                {isDelete && (
                  <CardContent className="w-[300px] flex flex-coljustify-center items-center">
                    <>
                      <div>Are Sou Sure To Delete</div>
                      <div className="flex gap-5 flex-row justify-center items-center">
                        <Button
                          onClick={handleConfirm}
                          className="bg-red-600 hover:bg-red-500 w-[100px]"
                        >
                          Yes
                        </Button>
                        <Button
                          onClick={handleDelete}
                          className="bg-blue-600 hover:bg-blue-500 w-[100px]"
                        >
                          No
                        </Button>
                      </div>
                    </>
                  </CardContent>
                )}
              </div>
              <div className="flex flex-col gap-5">
                <Button
                  onClick={handlePopUp}
                  className="sm:h-[40px] h-[30px] bg-green-600 hover:bg-green-500"
                >
                  Mark as
                </Button>
                {isPopUp && (
                  <div className="absolute lg:top-[13rem] md:top-[15rem] top-[20rem] flex lg:flex-row flex-col gap-3">
                    {invoice?.status !== "paid" &&
                      <Button onClick={handlePaid} className="sm:h-[40px] h-[30px] bg-green-600 px-5 hover:bg-green-500">
                        Paid
                      </Button>
                    }
                    {invoice?.status !== "read" &&
                      <Button onClick={handleRead} className="sm:h-[40px] h-[30px] bg-orange-600 px-5 hover:bg-orange-500">
                        Read
                      </Button>
                    }
                    {invoice?.status !== "unpaid" &&(
                      <Button onClick={handleUnPaid} className="sm:h-[40px] h-[30px] bg-red-600 px-5 hover:bg-red-500">
                        UnPaid
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </CardContent>
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-1">
        <CardContent className="flex justify-between gap-4">
          {/* <section>
            <p>Recent Activities</p>
            <p className="text-sm text-gray-400">
              You made 265 activities this month.
            </p>
          </section> */}
            {/* email={invoice?.client?.email}
            name={invoice?.client?.name} */}
          {invoice && (
            <MiddleCard
              email={invoice?.invoice_number}
              name={invoice?.name}
              invoicename={invoice?.name}
              invoice_number={invoice?.invoice_number}
              date={invoice?.date}
              due_date={invoice?.due_date}
            />
          )}
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
          <Button className="w-[200px] bg-pink-400 hover:bg-rose-400">
            Download Pdf
          </Button>
        </CardContent>
      </section>
    </div>
  );
}
