import InvoiceNotifcationCard from "@/components/InvoiceNotifcationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Invoice } from "@/models/invoice";
import React, { Suspense } from "react";

const loadingSkeletons = [1, 2, 3, 4, 5];

const NotificationPage = async () => {
  const res = await fetch(
    "http://localhost:3001/api/invoices",
    { cache: "no-cache" }
  );
  const invoices: Invoice[] = await res.json();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="text-xl">Notifications</div>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-col gap-3 ">
            {loadingSkeletons.map((skeleton) => (
              <Skeleton className="w-full h-36 rounded-md" key={skeleton} />
            ))}
          </div>
        }
      >
        {invoices.length > 0 ? (
          <div className="flex flex-col gap-2">
            {invoices.map((invoice: Invoice) => (
              <div
                key={invoice.id}
                className=" flex hover:bg-gray-50 duration-100 pl-2"
              >
                <input type="checkbox" />
                <InvoiceNotifcationCard invoice={invoice} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-2xl h-[80vh] w-full ">
            No Notifications.
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default NotificationPage;
