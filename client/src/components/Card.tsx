import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type CardProps = {
  label?: string;
  icon?:React.ComponentType<React.SVGProps<SVGSVGElement>>;
  amount?: any;
  total_amount?: any;
  discription?: string;
  path?: string;
  status?: string;
  status1?: string;
  status2?: string;
  status3?: string;
  client?: any;
  email?: string;
  name?: string;
};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm">{props.label}</p>
        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
        <div className="flex justify-around">
        <h2 className="font-semibold text-red-500">{props.status1}</h2>
        <h2 className="font-semibold text-green-500">{props.status2}</h2>
        <h2 className="font-semibold text-orange-500">{props.status3}</h2>
        </div>
        <p className="text-xs text-gray-500">{props.discription}</p>
        {/* <Link href={props.discription} className="text-xs text-blue-500">{props.path}</Link> */}
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}
