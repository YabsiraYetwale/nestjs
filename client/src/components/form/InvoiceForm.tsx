"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createInvoice, fetchInvoice, updateInvoice } from "@/redux/actions/invoices";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  client_id: z.string().min(1, "client_id  is required").max(100),
  invoice_number: z.string().min(1, "invoice_number  is required"),
  date: z.string().min(1, " date is required"),
  due_date: z.string().min(1, "due_dateis required"),
  status: z.string().min(1, "status required"),
  total_amount: z.coerce.number().gte(1, "Must be 1 and above"),
});
const InvoiceForm = ({params}:any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = params.id  as string;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      client_id: "",
      invoice_number: "",
      date: "",
      due_date: "",
      status: "",
      total_amount: 0,
    },
  });
  useEffect(() => {
 if(id){
  const fetchData = async () => {
    try {
      const response = await dispatch<any>(fetchInvoice(id));
      form.reset(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchData();
 }
  }, [id,dispatch]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if(id){
      dispatch<any>(updateInvoice(id,values,router));
    }
    else{
      dispatch<any>(createInvoice(values,router));
    }
  };
  return (
    <div className="flex flex-col gap-5   sm:items-center text-gray-600">
      <p className="font-bold text-[30px]">{id ? 'Edit ' :'Add ' }Invoice</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[60%] flex flex-col gap-5"
        >
          <div className="w-[100%] flex gap-5">
          <FormField
              control={form.control}
              name="status"
              render={({ field }:any) => (
                <FormItem className="flex flex-col gap-[10px]  items-center">
                <FormLabel>Status</FormLabel>
                  <FormControl>
                     <select {...field}  className='border text-center w-[150px] h-[40px]'>
                    <option>paid</option>
                    <option>unpaid</option>
                    <option>read</option>
                  </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }:any) => (
                <FormItem className="flex flex-col gap-[10px]  items-center">
                  <FormLabel>Client Email</FormLabel>
                  <FormControl>
                    <Input
                      className="sm:w-[32vw] w-[40vw] flex  gap-5"
                      placeholder="Enter client email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[100%] flex gap-5">
            <FormField
              control={form.control}
              name="date"
              render={({ field }:any) => (
                <FormItem className="flex flex-col gap-[10px]  items-center">
                <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="flex  gap-5"
                      placeholder="Enter the date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invoice_number"
              render={({ field }:any) => (
                <FormItem className="flex flex-col gap-[10px]  items-center">
                <FormLabel>Invoice Number</FormLabel>
                  <FormControl>
                    <Input
                      className="sm:w-[32vw] w-[40vw] flex  gap-5"
                      placeholder="Enter invoice number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[100%] flex gap-5">
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }:any) => (
                <FormItem className="flex flex-col gap-[10px]  items-center">
                <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="flex  gap-5"
                      placeholder="Enter the due date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="total_amount"
              render={({ field }:any) => (
                <FormItem className="flex flex-col gap-[10px]  items-center">
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="sm:w-[32vw] w-[40vw] flex  gap-5"
                      placeholder="Enter invoice total amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-[100px]" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InvoiceForm;
