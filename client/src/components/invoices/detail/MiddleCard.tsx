import {User}from "lucide-react";
// import {useLocale } from 'next-intl';


export type MiddleCardProps = {
  name: string;
  email: string;
  invoice_number: string,
  date: string,
  due_date: string,
};

export default function MiddleCard(props: MiddleCardProps) {
  const localActive = 'useLocale()';

  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section >
      <p>{localActive === "en" ? "customer" : "ደንበኛ"}</p>
        <div className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User/>
        </div>
        <div className="text-sm">
            <p>{props.name}</p>
            <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
                {props.email}
            </div>
        </div>
        </div>
      </section>
        <section>
            <p>{localActive === "en" ? "invoice number" : "የኢንቮይስ ቁጥር"}</p>
            <p className="text-sm text-gray-400">
            {props.invoice_number}
            </p>
          </section>
        <section>
            <p>{localActive === "en" ? "date" : "ቀን"}</p>
            <p className="text-sm text-gray-400">
            {props.date}
            </p>
          </section>
        <section>
            <p>{localActive === "en" ? "due date" : "ማስረከቢያ ቀን"}</p>
            <p className="text-sm text-gray-400">
            {props.due_date}
            </p>
          </section>
    </div>
  );
}
