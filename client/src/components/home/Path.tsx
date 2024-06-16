import Link from "next/link";
import { CardContent } from "@/components/Card";

export default function Path() {

  return (
    <CardContent className="flex flex-col justify-between">
      <section className="flex flex-col gap-5">
        <h2 className="font-bold">Quick access</h2>
        <div className="flex flex-col gap-3 text-blue-600">
          <Link
            href={`/dashboard/invoices/addInvoice`}
            className="hover:underline"
          >
            new Invoice
          </Link>
          <Link
            href={`/dashboard/customers`}
            className="hover:underline"
          >
            manage Customers
          </Link>
          <Link
            href={`/dashboard/invoices`}
            className="hover:underline"
          >
            view Status
          </Link>
        </div>
      </section>
    </CardContent>
  );
}
