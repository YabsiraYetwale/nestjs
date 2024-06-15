import { User } from "lucide-react";
import { CardProps } from "./Card";

export default function RecentInvoiceActivitiesCard(props: CardProps) {
  return (
    <div className="cursor-pointer px-5 rounded-md py-1 hover:bg-zinc-200 flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User />
        </div>
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
            {props.email}
          </div>
        </div>
      </section>
      <p>${props.total_amount}</p>
    </div>
  );
}
