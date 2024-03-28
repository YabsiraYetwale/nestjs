import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import ItemsCard from "@/components/invoiceDetail/ItemsCard";
import MiddleCard, { MiddleCardProps } from "@/components/invoiceDetail/MiddleCard";
import StatusCard from "@/components/invoiceDetail/StatusCard";
import { Button, buttonVariants } from "@/components/ui/button";


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

export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Item Details" />
    
      <section className="grid grid-cols-1  gap-4 transition-all">
        <CardContent className="grid grid-cols-2 gap-5">
          <section className="flex items-center gap-4">
            <p>Status</p>
            <p className=" text-red-400">
             Unpaid
            </p>
          </section>
          <section  className="grid grid-cols-3 gap-5">
            <Button className='bg-blue-600 hover:bg-blue-5'>Edit</Button>
            <Button className='bg-red-600 hover:bg-red-500'>Delete</Button>
            <Button className='bg-green-600 hover:bg-green-500'>Mark as Paid</Button>
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
        </CardContent>
      </section>
    </div>
  );
}
