'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fetchInvoice } from "@/redux/actions/invoices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { InvoiceProps } from "../../../schemas/InvoiceProps";
import {updateCustomerTemplate } from "@/redux/actions/customers";

const FormSchema = z.object({
    name             :z.string().optional(),
    email            :z.string().email("Invalid email").optional(),     
    billing_address  :z.string().optional(),
    shipping_address :z.string().optional(),
    shipping_city    :z.string().optional(),
    shipping_state   :z.string().optional(),
    shipping_zip     :z.string().optional(),
    shipping_country :z.string().optional(),
    contact_person   :z.string().optional(),
    phone            :z.string().optional(),
  });


const TemplateForm = ({params}:any) => {
    const id = params.id as string;
    const dispatch = useDispatch();
    const router = useRouter();
    const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await dispatch<any>(fetchInvoice(id));
          setInvoice(response);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }, [id, dispatch]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          name: invoice?.client.name,
          email: invoice?.client?.email,
        },
      });
      const onSubmit = (values: z.infer<typeof FormSchema>) => {
        dispatch<any>(updateCustomerTemplate(invoice?.client?.id, values,router));
      };
return (
<Form {...form}>
<form
  onSubmit={form.handleSubmit(onSubmit)}
  className="w-[100%] flex flex-col gap-5"
>
  <div
    className=''
  >
    <FormField
      control={form.control}
      name="name"
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <input
              className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 "
              type="text"
              defaultValue={invoice?.client?.name}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="email"
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <input
              className="w-[150px]"
              defaultValue={invoice?.client?.email}
              placeholder="youremail@example.com"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="billing_address"
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <input
              className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 "
              type="text"
              defaultValue={invoice?.client?.billing_address}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="phone"
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <input
              className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400"
              placeholder="city"
              type="text"
              defaultValue={invoice?.client?.phone}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="shipping_address"
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <input
              className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 "
              type="text"
              defaultValue={invoice?.client?.shipping_address}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="shipping_address"
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <input
              className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 "
              type="text"
              defaultValue={invoice?.client?.shipping_address}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="shipping_zip"
      render={({ field }: any) => (
        <FormItem>
          <FormControl>
            <input
              className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 "
              type="text"
              defaultValue={invoice?.company?.shipping_zip}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
  <div className="flex gap-5 mt-6">
    <Button className="absolute bg-transparent hover:bg-transparent top-[-60px] right-[20rem] flex text-purple-600 font-semibold items-center space-x-2 px-3 py-2 rounded-sm border border-purple-600">
      <span>Save Online</span>
    </Button>
  </div>
</form>
</Form>
  );
};

export default TemplateForm;
