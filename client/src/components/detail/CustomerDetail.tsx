"use client";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardContent } from "../Card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteCustomer, fetchCustomer } from "@/redux/actions/customers";

type CustomerProps = {
  name: string;
  phone: string;
  email: string;
  contact_person:string;
  billing_address:string;
};

export default function CustomerDetail({params}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = params.id;
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  console.log("idscus", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCustomer(id));
        setCustomer(response);
        console.log("res", response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const handleDelete = () => {
    setIsDelete(!isDelete);
  };
  const handleConfirm = () => {
    dispatch(deleteCustomer(id,router))
  };
  return (
    <div className='flex flex-col gap-[170px]'>
      <section className="flex gap-5">
        <div className=" h-20 w-20 rounded-full flex justify-center items-center bg-gray-100 p-1">
          <User />
        </div>
        <section className="flex flex-col gap-5 py-[20px]">
          <div className="flex flex-col">
            <div className="font-bold text-[20px] text-gray-600">
             {customer?.name}
            </div>
            <p className="text-sm text-gray-400">Customer in Invoice system.</p>
          </div>
          <section className="flex flex-col gap-5 relative sm:left-0 left-[-4.5rem]">
            <div className="grid grid-cols-2  md:gap-[300px] gap-5 sm:gap-5  lg:gap-[400px]">
              <div className="flex flex-col gap-2 ">
                <div className="font-bold text-gray-400">Phone Number</div>
                <p className="text-sm text-gray-400">{customer?.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-bold text-gray-400">Email Address</div>
                <p className="text-sm text-gray-400">{customer?.email}</p>
              </div>
            </div>
            <div className="flex gap-5 justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="font-bold text-gray-400">Contact Person</div>
                <p className="text-sm text-gray-400">{customer?.contact_person}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-bold text-gray-400">Billing Address</div>
                <p className="text-sm text-gray-400">
                  {customer?.billing_address}
                </p>
              </div>
            </div>
          </section>
        </section>
      </section>
   <div className="flex absolute lg:right-[30rem] top-[20rem] bg-gray-200  flex-row justify-center items-center">
        {isDelete && (
          <CardContent className="w-[300px] flex flex-coljustify-center  items-center">
            <>
            <div>Are Sou Sure To Delete</div>
            <div className="flex gap-5 flex-row justify-center items-center">
            <Button
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-500 w-[100px]"
            >
              Yes
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-blue-600 hover:bg-blue-500 w-[100px]"
            >
              No
            </Button>
            </div>
            </>
          </CardContent>
        )}
      </div>
      <CardContent className="flex flex-row justify-between">
        <Link href={`/customers/edit/${id}`}>
          <Button className="bg-blue-600 hover:bg-blue-500 w-[100px]">
            Edit
          </Button>
        </Link>
        <Button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-500 w-[100px]"
        >
          Delete
        </Button>
      </CardContent>
    </div>
  );
}
