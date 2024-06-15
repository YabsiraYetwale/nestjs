"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import customerSchema from "@/schemas/customer";
import { Client } from "@/models/client";
import OverlaySpinner from "../OverlaySpinner";

interface Props {
  customer?: Client | null;
  isSending: boolean;
  onSubmit: (values: z.infer<typeof customerSchema>) => void;
}

const CustomerForm = ({ customer, isSending, onSubmit }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer
      ? {
          name: customer.name,
          email: customer.email,
          billing_address: customer.billing_address,
          contact_person: customer.contact_person,
          phone: customer.phone,
          shipping_address: customer.shipping_address,
          shipping_city: customer.shipping_city,
          shipping_state: customer.shipping_state,
          shipping_zip: customer.shipping_zip,
          shipping_country: customer.shipping_country,
        }
      : {
          name: "",
          email: "",
          billing_address: "",
          contact_person: "",
          phone: "",
          shipping_address: "",
          shipping_city: "",
          shipping_state: "",
          shipping_zip: "",
          shipping_country: "",
        },
  });

  const onCancel = () => router.back();

  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold text-[30px]">
        {customer ? "Update " : "Add "}Customer
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  flex flex-col gap-5 items-center"
        >
          <OverlaySpinner isLoading={isSending} />

          <div className="w-full lg:w-[800px] flex flex-col gap-5 mt-10">
            <div className="w-full flex flex-col gap-5">
              <p className=" text-[20px] text-gray-600 ">
                Customer Information
              </p>
              <div className="flex flex-col lg:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Fullname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="youremail@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="contact_person"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Contact Person " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Telephone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="billing_address"
                render={({ field }: any) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Billing Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col gap-5">
              <p className=" text-[20px] text-gray-600 ">
                Shipping Information
              </p>
              <div className="flex flex-col lg:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Fullname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipping_address"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Shipping Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="shipping_city"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Shipping City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipping_state"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Shipping State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="shipping_zip"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Shipping Zipcode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipping_country"
                  render={({ field }: any) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Shipping Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                className="bg-blue-600 w-24 hover:bg-blue-500 "
                type="submit"
              >
                {customer ? "Update " : "Add "}
              </Button>
              <Button
                onClick={onCancel}
                type="button"
                className="bg-gray-400 w-24 text-white hover:bg-gray-500"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerForm;
