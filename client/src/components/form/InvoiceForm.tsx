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
import { Customers } from "@/app/customers/page";
import Link from "next/link";
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
  shipping_address:z.string(),
  shipping_city   :z.string(),
  shipping_state  :z.string(),
  shipping_zip    :z.string(),
  shipping_country:z.string(),
});

const FormSchema = z.object({
  client_id: z.string(),
  client,
  invoice_number: z.string().min(1, "invoice_number  is required"),
  date: z.string().min(1, " date is required"),
  due_date: z.string().min(1, "due_dateis required"),
  status: z.string().min(1, "status required"),
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
      client:{},
      invoice_number: "",
      date: "",
      due_date: "",
      status: "",
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

  const [customer, setCustomer] = useState<Customers[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCustomers());
        setCustomer(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [dispatch]);

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
          className="w-[100%] flex flex-col gap-5"
        >
          <div  className="w-[100%] flex flex-col gap-5">
          <div className='flex gap-5 flex-wrap'>
          <div className='w-[100%] flex flex-col gap-5'>
          <div className='flex gap-5 items-center flex-wrap'>
            <p className='font-bold text-[20px] text-gray-600'>Customer Information</p>
            <div className='flex items-center justify-center'>  
              <p className="text-blue-600 font-bold">OR Existing Customer</p> 
              <FormField
              control={form.control}
              name="client_id"
              render={({ field }: any) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <select
                      className="flex  gap-5 border"
                      {...field}
                    >
                      <option>{customer?.map((i)=>i?.email)}</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            </div>
          <FormField
            control={form.control}
            name='client.name'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='client.email'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='youremail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='client.billing_address'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter the billing address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='client.contact_person'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter contact person ' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='client.phone'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className='w-[100%] flex flex-col gap-5'>
          <p className='font-bold text-[20px] text-gray-600'>Shipping Information</p>
        <FormField
            control={form.control}
            name='client.shipping_address'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter shipping_address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name='client.shipping_city'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter shipping city' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name='client.shipping_state'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter shipping state' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name='client.shipping_zip'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter shipping zipcode' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name='client.shipping_country'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter shipping country' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        </div>
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
          </div>
          <div className='flex gap-5 mt-6'>
        <Button className='bg-blue-600 sm:h-[40px] h-[30px] w-[100px] hover:bg-blue-500 ' type='submit'>
          Save
        </Button>
        <Button className="bg-red-600 sm:h-[40px] h-[30px]  hover:bg-red-500">
                <Link href={`/invoices`}>Cancel</Link>
              </Button>
        </div>
        </form>
      </Form>
    </div>
  );
};

export default InvoiceForm;
