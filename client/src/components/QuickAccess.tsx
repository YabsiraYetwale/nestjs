import React from "react";
import Link from "next/link";
import { CardContent } from "./Card";

const QuickAccess = () => {
  return (
    <CardContent className="flex flex-col justify-between">
      <div className="flex flex-col gap-5 ">
        <h2 className="font-bold">Quick access</h2>
        <div className="flex flex-col gap-3 text-blue-600">
          <p>
            <Link
              href="/dashboard/invoices/addInvoice"
              className="hover:underline"
            >
              Create New Invoice
            </Link>
          </p>
          <p>
            <Link href="/dashboard/customers" className="hover:underline">
              Manage Customers
            </Link>
          </p>
          <p>
            <Link href="/dashboard/invoices" className="hover:underline">
              View Invoice Status
            </Link>
          </p>
        </div>
      </div>
    </CardContent>
  );
};

export default QuickAccess;
