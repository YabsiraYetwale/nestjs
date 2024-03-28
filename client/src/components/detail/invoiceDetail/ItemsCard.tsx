import {User}from "lucide-react";

export type ItemsProps = {
  name: string;
  email: string;
  saleAmount: string;
};

export default function ItemsCard(props: ItemsProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User/>
        </div>
        <div className="text-sm">
            <p>{props.name}</p>
            <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
                {props.email}
            </div>
        </div>
      </section>
        <p>{props.saleAmount}</p>
    </div>
  );
}
