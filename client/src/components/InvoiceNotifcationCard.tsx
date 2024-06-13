import { Invoice } from "@/models/invoice";
import { User, Clock12 } from "lucide-react";
import React from "react";

interface Props {
  invoice: Invoice;
}

const InvoiceNotifcationCard = ({ invoice }: Props) => {
  return (
    <div className="w-full h-36 bg-transparent rounded-md px-2 grid grid-cols-[300px_auto_200px] gap-x-3 overflow-y-hidden hover:bg-gray-50 duration-100">
      <div className="flex items-center border-r-2 border-zinc-100 gap-2">
        <div className=" h-12 w-12 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User />
        </div>
        <div className="flex flex-col">
          <p className="text-[15px]">
            {invoice?.client.name ? invoice?.client.name : ""}
          </p>
          <p className="text-sm text-zinc-500">
            {invoice?.client.email ? invoice?.client.email : ""}
          </p>
        </div>
      </div>

      <div className="text-sm border-r-2 border-zinc-100 py-1 flex flex-col gap-1 xl:gap-3">
        <p className="line-clamp-4 xl:line-clamp-none pr-1">
          Description:{" "}
          <span className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            et eros lacus. Nunc venenatis tincidunt mauris sit amet pretium.
            Nunc nisi nunc, tempor eget turpis non, viverra vulputate orci.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            et eros lacus. Nunc venenatis tincidunt mauris sit amet pretium.
          </span>
        </p>

        <p>
          Price: <span className="text-gray-500">${invoice.total_amount}</span>
        </p>
      </div>

      <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
        <Clock12 />
        <p>24 Nov 2018 at 9:30 AM </p>
      </div>
    </div>
  );
};

export default InvoiceNotifcationCard;
