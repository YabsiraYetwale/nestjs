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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  createInvoice,
  fetchInvoice,
  updateInvoice,
} from "@/redux/actions/invoices";
import { useEffect, useState } from "react";
import { fetchCustomers } from "@/redux/actions/customers";
import { Client } from "@/models/client";

import Link from "next/link";
import { CardContent } from "../Card";
import { Textarea } from "../ui/textarea";
const LineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().gte(1, "Quantity must be 1 and above"),
  unit_price: z.coerce.number().gte(1, "Unit Price must be 1 and above"),
  tax_rate: z.coerce.number().gte(0, "Tax Rate must be 0 and above"),
});
const client = z.object({
  name: z.string(),
  email: z.string(),
  billing_address: z.string(),
  contact_person: z.string(),
  phone: z.string(),
  shipping_address: z.string(),
  shipping_city: z.string(),
  shipping_state: z.string(),
  shipping_zip: z.string(),
  shipping_country: z.string(),
});

const FormSchema = z.object({
  // client_id: z.string(),
  client,
  due_date: z.string().min(1, "due_date is required"),
  status: z.string(),
  line_items: z.array(LineItemSchema),
});
const InvoiceForm = ({ params }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = params.id as string;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // client_id: "",
      client: {},
      due_date: "",
      // status: "",
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
  }, [id, dispatch, form]);

  const [customers, setCustomers] = useState<Client[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCustomers(''));
        setCustomers(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (id) {
      dispatch<any>(updateInvoice(id, values, router,''));
      router.push(`/invoices/details/${id}`);
      console.log("valuess", values);
    } else {
      dispatch<any>(createInvoice(values, router));
      router.push("/invoices");
    }
  };

  const onCancel = () => router.back();

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
    <div className="flex flex-col gap-5 text-gray-600">
      <p className="font-bold text-[30px]">
        {id ? "Update " : "Create "}Invoice
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  flex flex-col gap-5 items-center"
        >
          <div className="w-full lg:w-[800px] flex flex-col gap-5 mt-10">
            <div className="w-full  flex gap-5">
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }: any) => (
                  <FormItem className=" flex flex-col gap-[10px]">
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
                name="status"
                render={({ field }: any) => (
                  <FormItem className="flex flex-col gap-[10px] ">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border text-center w-[150px] h-[40px]"
                      >
                        <option>unpaid</option>
                        <option>paid</option>
                        <option>read</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-col gap-5">
              <p className=" text-[20px] text-gray-600 ">
                Customer Information
              </p>
              <div className="flex flex-col lg:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="client.name"
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
                  name="client.email"
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
                  name="client.contact_person"
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
                  name="client.phone"
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
                name="client.billing_address"
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
                  name="client.name"
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
                  name="client.shipping_address"
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
                  name="client.shipping_city"
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
                  name="client.shipping_state"
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
                  name="client.shipping_zip"
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
                  name="client.shipping_country"
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
              <div className="w-[100%] flex gap-5 flex-col">
                <Button
                  className="w-[150px] bg-green-600 hover:bg-green-400"
                  onClick={addLineItem}
                >
                  Add Line Item
                </Button>
                {form
                  .watch("line_items")
                  ?.map((lineItem: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-[10px] md:items-center"
                    >
                      <FormLabel>{index + 1}</FormLabel>
                      <div className="flex md:flex-row flex-col gap-5">
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
                          className="bg-red-500 hover:bg-red-400"
                        >
                          remove
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                className="bg-blue-600 w-24 hover:bg-blue-500 "
                type="submit"
              >
                {id ? "Update " : "Add "}
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

export default InvoiceForm;
