import { User } from "lucide-react";

export type MiddleCardProps = {
  name: string;
  email: string;
  invoice_number: string;
  date: string;
  due_date: string;
};

export default function MiddleCard(props: MiddleCardProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section>
        <p>Customer</p>
        <div className="flex justify-between gap-3 ">
          <div className="text-sm">
            <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
              {props.email}
            </div>
          </div>
        </div>
      </section>
      <section>
        <p>Invoice number</p>
        <p className="text-sm text-gray-400">{props.invoice_number}</p>
      </section>
      <section>
        <p>Date</p>
        <p className="text-sm text-gray-400">{props.date}</p>
      </section>
      <section>
        <p>Due Date</p>
        <p className="text-sm text-gray-400">{props.due_date}</p>
      </section>
    </div>
  );
}
