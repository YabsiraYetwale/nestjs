// "use client";

// import { DataTable } from "@/components/DataTable";
// import { ColumnDef } from "@tanstack/react-table";
// import React from "react";
// import PageTitle from "@/components/PageTitle";
// import Link from "next/link";
// import {Trash2,UserPlus,User} from "lucide-react";

// type Props = {};
// type Payment = {
//   name: string;
//   email: string;
//   billing_address: string;
//   contact_person: string;
//   phone: string;
//   path?: string;
// };

// const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => {
//       return (
//         <div className="flex gap-2 items-center">
//           <div className="h-10 w-10  bg-zinc-100 py-2 border-b border-s-zinc-200 flex items-center justify-center">
//           <User/>
//           </div>
//           <p>{row.getValue("name")} </p>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: "email",
//     header: "Email"
//   },
//   {
//     accessorKey: "billing_address",
//     header: "Billing Address"
//   },
//   {
//     accessorKey: "contact_person",
//     header: "Contact Person"
//   },
//     {
//     accessorKey: "phone",
//     header: "Phone"
//   },
//   {
//     accessorKey: "path",
//     header: "Manage",
//     cell: ({ row,id }) => {
//       return (
//         <div className="flex gap-2 items-center">
//           <Link className="bg-blue-400 px-5 py-2 text-white rounded-[10px]" href={`/customers/details/${id}`}>View</Link>
//         </div>
//       );
//     }
//   },
// ];

// const data: Payment[] = [
//   {
//     name: "John Doe",
//     email: "john@example.com",
//     billing_address: "staAA ",
//     contact_person: "Selam",
//     phone:"+251926198491"
//   },
//   {
//     name: "Alice Smith",
//     email: "alice@example.com",
//     billing_address: "staAA ",
//     contact_person: "Ezra",
//     phone:"+251926198491"
//   },
//   {
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     billing_address: "staAA ",
//     contact_person: "Rita",
//     phone:"+251926198491"
//   },
//   {
//     name: "Emma Brown",
//     email: "emma@example.com",
//     billing_address: "staAA ",
//     contact_person: "Rudolf",
//     phone:"+251926198491"
//   },
//   {
//     name: "Michael Davis",
//     email: "michael@example.com",
//     billing_address: "staAA ",
//     contact_person: "Maria",
//     phone:"+251926198491"
//   },
//   {
//     name: "Sophia Wilson",
//     email: "sophia@example.com",
//     billing_address: "staAA ",
//     contact_person: "Selam",
//     phone:"+251926198491"
//   },
//   {
//     name: "Liam Garcia",
//     email: "liam@example.com",
//     billing_address: "staAA ",
//     contact_person: "Chris",
//     phone:"+251926198491"
//   },
//   {
//     name: "Olivia Martinez",
//     email: "olivia@example.com",
//     billing_address: "staAA ",
//     contact_person: "Yoyo",
//     phone:"+251926198491"
//   },
//   {
//     name: "Noah Rodriguez",
//     email: "noah@example.com",
//     billing_address: "staAA ",
//     contact_person: "Alferd",
//     phone:"+251926198491"
//   },
//   {
//     name: "Ava Lopez",
//     email: "ava@example.com",
//     billing_address: "staAA ",
//     contact_person: "Alex",
//     phone:"+251926198491"
//   },
//   {
//     name: "Elijah Hernandez",
//     email: "elijah@example.com",
//     billing_address: "staAA ",
//     contact_person: "Ali",
//     phone:"+251926198491"
//   },
//   {
//     name: "Mia Gonzalez",
//     email: "mia@example.com",
//     billing_address: "staAA ",
//     contact_person: "Mala",
//     phone:"+251926198491"
//   },
//   {
//     name: "James Perez",
//     email: "james@example.com",
//     billing_address: "staAA ",
//     contact_person: "Erfa",
//     phone:"+251926198491"
//   },
//   {
//     name: "Charlotte Carter",
//     email: "charlotte@example.com",
//     billing_address: "staAA ",
//     contact_person: "Zem",
//     phone:"+251926198491"
//   },
//   {
//     name: "Benjamin Taylor",
//     email: "benjamin@example.com",
//     billing_address: "staAA ",
//     contact_person: "Swift",
//     phone:"+251926198491"
//   },
// ];

// export default function UsersPage({}: Props) {
//   return (
    // <div className="flex justify-evenly">
    // <div className="flex flex-col gap-5  w-full">
    //   <PageTitle title="Customers" />
    //   <DataTable columns={columns} data={data} />
    // </div>
    // <div className="flex justify-center items-center sm:relative absolute right-[10px] sm:top-[-10px] sm:w-[70px] w-[50px] sm:h-[65px] h-[50px] rounded-full bg-red-200">
    // <Link href='/customers/addCustomer' ><UserPlus/></Link>
    // </div>
    // </div>
//   );
// }
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import {Trash2,UserPlus,User} from "lucide-react";
import {useDispatch} from "react-redux";
import { fetchCustomers } from "@/redux/actions/customers";
type Props = {};
type Customers = {
  name: string;
  email: string;
  billing_address: string;
  contact_person: string;
  phone: string;
  path?: string;
};

const columns: ColumnDef<Customers>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10  bg-zinc-100 py-2 border-b border-s-zinc-200 flex items-center justify-center">
          <User/>
          </div>
          <p>{row.getValue("name")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "billing_address",
    header: "Billing Address"
  },
  {
    accessorKey: "contact_person",
    header: "Contact Person"
  },
    {
    accessorKey: "phone",
    header: "Phone"
  },
  {
    accessorKey: "path",
    header: "Manage",
    cell: ({ row,id }) => {
      return (
        <div className="flex gap-2 items-center">
          <Link className="bg-blue-400 px-5 py-2 text-white rounded-[10px]" href={`/customers/details/${id}`}>View</Link>
        </div>
      );
    }
  },
];



export default function CustomersPage({}: Props) {
  const [customer, setCustomer] = useState<Customers[] | null>(null);
const dispatch = useDispatch();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch(fetchCustomers());
      setCustomer(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, [dispatch]);
  return (
    <div className="flex justify-evenly">
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Customers" />
      {customer && <DataTable columns={columns} data={customer} />}
    </div>
    <div className="flex justify-center items-center sm:relative absolute right-[10px] sm:top-[-10px] sm:w-[70px] w-[50px] sm:h-[65px] h-[50px] rounded-full bg-red-200">
    <Link href='/customers/addCustomer' ><UserPlus/></Link>
    </div>
    </div>
  );
}
