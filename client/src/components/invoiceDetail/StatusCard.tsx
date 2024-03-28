import {User}from "lucide-react";

export type StatusProps = {
  status: string;
};

export default function StatusCard(props: StatusProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User/>
        </div>
        <div className="text-sm">
            <p>{props.status}</p>
        </div>
      </section>
    </div>
  );
}
