import {User}from "lucide-react";


export default function CustomerDetail() {
  return (
    <div className="flex flex-wrap">
      <section className="flex gap-5">
        <div className=" h-20 w-20 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User/>
        </div>
        <section className="flex flex-col gap-5 py-[20px]">
        <div className="flex flex-col">
            <div className="font-bold text-[20px] text-gray-600">Yabsira Yetwale</div>
            <p className="text-sm text-gray-400">
              Customer in Invoice system.
            </p>
        </div>
        <section className="flex flex-col gap-5 ">
        <div className="grid grid-cols-2 gap-[400px]">
         <div className="flex flex-col gap-2 ">
            <div className="font-bold text-gray-400">Phone Number</div>
             <p className="text-sm text-gray-400">
             +251926198491
            </p>
        </div>
        <div className="flex flex-col gap-2">
            <div className="font-bold text-gray-400">Email  Address</div>
             <p className="text-sm text-gray-400">
             john@example.com
            </p>
        </div>
        </div>
        <div className="flex gap-5 justify-between items-center">
         <div className="flex flex-col gap-2">
            <div className="font-bold text-gray-400">Contact Person</div>
             <p className="text-sm text-gray-400">
             Alice Smith
            </p>
        </div>
         <div className="flex flex-col gap-2">
            <div className="font-bold text-gray-400">Billing Address</div>
             <p className="text-sm text-gray-400">
             Customer Billing Address.
            </p>
        </div>
        </div>
     </section>
     </section>
      </section>
    </div>
  );
}