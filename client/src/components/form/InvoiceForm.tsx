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
import {
  createInvoice,
  fetchInvoice,
  updateInvoice,
} from "@/redux/actions/invoices";
import { useEffect, useState } from "react";
const LineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().gte(1, "Quantity must be 1 and above"),
  unit_price: z.coerce.number().gte(1, "Unit Price must be 1 and above"),
  tax_rate: z.coerce.number().gte(0, "Tax Rate must be 0 and above"),
});

const FormSchema = z.object({
  client_id: z.string().min(1, "client_id  is required").max(100),
  invoice_number: z.string().min(1, "invoice_number  is required"),
  date: z.string().min(1, " date is required"),
  due_date: z.string().min(1, "due_dateis required"),
  status: z.string().min(1, "status required"),
  total_amount: z.coerce.number().gte(1, "Must be 1 and above"),
  line_items: z.array(LineItemSchema),
});
const InvoiceForm = ({ params }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = params.id as string;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      client_id: "",
      invoice_number: "",
      date: "",
      due_date: "",
      status: "",
      total_amount: 0,
      line_items: [],
    },
  });
  useEffect(() => {
    if (id) {
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
  }, [id, dispatch]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("valuessaa",values)

    if (id) {
      dispatch<any>(updateInvoice(id, values, router));
      router.push(`/invoices/details/${id}`);
      console.log("valuess",values)
    } else {
      dispatch<any>(createInvoice(values, router));
      router.push("/invoices");
    }
  };
  const removeLineItem = (index: number) => {
    const line_items = form.getValues().line_items;
    line_items.splice(index, 1);
    form.setValue("line_items", line_items);
  };
  const addLineItem = () => {
    const lineItem = {
      description: "",
      quantity: 0,
      unit_price: 0,
      tax_rate: 0,
    };
    form.setValue("line_items", [...form.getValues().line_items, lineItem]);
  };
  return (
    <div className="flex flex-col gap-5   sm:items-center text-gray-600">
      <p className="font-bold text-[30px]">{id ? "Edit " : "Add "}Invoice</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[60%] flex flex-col gap-5"
        >
          <div className="w-[100%] flex gap-5">
            <FormField
              control={form.control}
              name="status"
              render={({ field }: any) => (
                <FormItem className="flex flex-col gap-[10px]  items-center">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="border text-center w-[150px] h-[40px]"
                    >
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
              render={({ field }: any) => (
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
              render={({ field }: any) => (
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
              render={({ field }: any) => (
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
              render={({ field }: any) => (
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
              render={({ field }: any) => (
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
          <div className="w-[100%] flex gap-5 flex-col">
          <Button className="w-[150px] bg-green-600 hover:bg-green-400" onClick={addLineItem}>Add Line Item</Button>
            {form.watch("line_items")?.map((lineItem: any, index: number) => (
              <div
                key={index}
                className="flex gap-[10px] items-center"
              >
                <FormLabel>{index + 1}</FormLabel>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name={`line_items.${index}.description`}
                    render={({ field }: any) => (
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`line_items.${index}.quantity`}
                    render={({ field }: any) => (
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`line_items.${index}.unit_price`}
                    render={({ field }: any) => (
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Unit Price"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`line_items.${index}.tax_rate`}
                    render={({ field }: any) => (
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Tax Rate"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  <Button
                    onClick={() => removeLineItem(index)}
                    className="text-red-500"
                  >
                    remove
                  </Button>
                </div>
              </div>
            ))}
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
