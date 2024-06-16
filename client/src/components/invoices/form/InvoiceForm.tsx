"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  createInvoice,
  fetchInvoice,
  updateInvoice,
} from "@/redux/actions/invoices";
import { useEffect, useState } from "react";
import { fetchCustomers } from "@/redux/actions/customers";
import Link from "next/link";
import { CardContent } from "../../Card";
import { CustomersProps } from "../../schemas/customerProps";
import { fetchCompanies } from "@/redux/actions/companies";
import { CompanyProps } from "@/components/schemas/companyProps";

const recipient_company = z.object({
  id: z.string().optional(),
});
const LineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().gte(1, "Quantity must be 1 and above"),
  unit_price: z.coerce.number().gte(1, "Unit Price must be 1 and above"),
});
const client = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  billing_address: z.string().optional(),
  contact_person: z.string().optional(),
  phone: z.string().optional(),
  shipping_address: z.string().optional(),
  shipping_city: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_zip: z.string().optional(),
  shipping_country: z.string().optional(),
});

const FormSchema = z.object({
  recipient_company,
  client,
  due_date: z.string().min(1, "due_date is required"),
  status: z.string().optional(),
  line_items: z.array(LineItemSchema),
});
const InvoiceForm = ({ params }: any) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const id = params.id as string;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recipient_company: {},
      client: {},
      due_date: "",
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

  const [customer, setCustomer] = useState<CustomersProps[] | null>(null);
  const [companies, setCompanies] = useState<CompanyProps[] | null>(null);

  const [existingCustomer, setExistingCustomer] = useState(false);
  const [existingCompany, setExistingCompany] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCompanies());
        setCompanies(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCustomers(search));
        setCustomer(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (id) {
      dispatch<any>(updateInvoice(id, values, router));
      router.push(`/dashboard/invoices/details/${id}`);
      console.log("valuess", values);
    } else {
      dispatch<any>(createInvoice(values, router));
      router.push(`/dashboard/invoices`);
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
    };
    form.setValue("line_items", [...form.getValues().line_items, lineItem]);
  };
  return (
    <div className="flex flex-col gap-5 text-gray-600">
      <p className="font-bold md:text-[30px] text-[20px]">
        {id
          ? "Edit Invoice"
          : 
          "Create New Invoice"
          }
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[100%] flex flex-col gap-5"
        >
          <div className="flex justify-between gap-5 flex-wrap">
            {!existingCompany && (
              <p
                onClick={() => setExistingCompany(true)}
                className="text-blue-600 hover:text-blue-400  cursor-pointer"
              >
                {
                   "If you want to send this invoice to other company click here"
                }
              </p>
            )}
            {existingCompany && (
              <FormField
                control={form.control}
                name="recipient_company.id"
                render={({ field }: any) => (
                  <FormItem>
                    <FormControl>
                      <select className="flex gap-5 border" {...field}>
                        <option>
                          {" "}
                          --
                          {
                            "choose company"
                            }{" "}
                          --
                        </option>
                        {companies?.map((i, index) => (
                          <option key={index} value={i?.id}>
                            {i?.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="">
              <div className="w-[100%] flex gap-5">
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }: any) => (
                    <FormItem className="w-[80%] flex flex-col gap-[10px]  items-center">
                      <FormLabel>
                        {"Due Date"}
                      </FormLabel>
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
                    <FormItem className="flex flex-col gap-[10px]  items-center">
                      <FormLabel>
                        {"Status"}
                      </FormLabel>
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
            </div>

            <div className=" flex flex-col gap-5">
              <div className="flex md:flex-row flex-col gap-5">
                <CardContent
                  className={`${
                    existingCustomer && "relative "
                  } w-[100%] flex flex-col gap-5`}
                >
                  <div className="flex md:flex-row flex-col gap-5 items-center bg-zinc-100 py-2 px-5 border-b border-s-zinc-200 w-[107.5%] relative top-[-19.5px] left-[-19px]">
                    <p
                      onClick={() => setExistingCustomer(false)}
                      className="font-bold cursor-pointer text-[20px] text-gray-600 hover:text-gray-400"
                    >
                      {
                        "Customer Information"
                       }
                    </p>
                    <div className="flex">
                      <div className="flex gap-2">
                        <p className="text-blue-600 hover:text-blue-400 font-bold ">
                          {"OR"}
                        </p>
                        {!existingCustomer && (
                          <p
                            onClick={() => setExistingCustomer(true)}
                            className="text-blue-600 hover:text-blue-400 font-bold cursor-pointer"
                          >
                            {
                               "Existing Customer"
                              }
                          </p>
                        )}
                      </div>
                      {existingCustomer && (
                        <FormField
                          control={form.control}
                          name="client.email"
                          render={({ field }: any) => (
                            <FormItem>
                              <FormControl>
                                <select
                                  className="flex gap-5 border"
                                  {...field}
                                >
                                  <option>
                                    {" "}
                                    --
                                    {
                                      "choose email"
                                      }{" "}
                                    --
                                  </option>
                                  {customer?.map((i, index) => (
                                    <option key={index}>{i?.email}</option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                  {!existingCustomer && (
                    <>
                      <div className="flex gap-5">
                        <FormField
                          control={form.control}
                          name="client.name"
                          render={({ field }: any) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="md:w-[18vw] w-[100%]"
                                  placeholder="Enter Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="client.email"
                          render={({ field }: any) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="md:w-[18vw] w-[100%]"
                                  placeholder="youremail@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex gap-5">
                        <FormField
                          control={form.control}
                          name="client.contact_person"
                          render={({ field }: any) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="md:w-[18vw] w-[100%]"
                                  placeholder="Enter contact person "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="client.phone"
                          render={({ field }: any) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="md:w-[18vw] w-[100%]"
                                  placeholder="Enter phone number"
                                  {...field}
                                />
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
                              <textarea
                                className="w-[100%] p-5 h-[100px] border"
                                placeholder="Enter the billing address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </CardContent>

                {!existingCustomer && (
                  <CardContent className="w-[100%] flex flex-col gap-5">
                    <p className="font-bold text-[20px] text-gray-600 bg-zinc-100 py-5 px-5 border-b border-s-zinc-200 w-[107.5%] relative top-[-19.5px] left-[-19px]">
                      {
                        "Shipping Information"
                       }
                    </p>
                    <div className="flex gap-5">
                      <FormField
                        control={form.control}
                        name="client.name"
                        render={({ field }: any) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="md:w-[18vw] w-[100%]"
                                placeholder="Enter Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="client.shipping_address"
                        render={({ field }: any) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="md:w-[18vw] w-[100%]"
                                placeholder="Enter shipping_address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-5">
                      <FormField
                        control={form.control}
                        name="client.shipping_city"
                        render={({ field }: any) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="md:w-[18vw] w-[100%]"
                                placeholder="Enter shipping city"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="client.shipping_state"
                        render={({ field }: any) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="md:w-[18vw] w-[100%]"
                                placeholder="Enter shipping state"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-5">
                      <FormField
                        control={form.control}
                        name="client.shipping_zip"
                        render={({ field }: any) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="md:w-[18vw] w-[100%]"
                                placeholder="Enter shipping zipcode"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="client.shipping_country"
                        render={({ field }: any) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="md:w-[18vw] w-[100%]"
                                placeholder="Enter shipping country"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                )}
              </div>
            </div>
            <div className="w-[100%] flex gap-5 flex-col">
              <Button
                className="w-[150px] bg-green-600 hover:bg-green-400"
                onClick={addLineItem}
              >
                Add Line Item
              </Button>
              {form.watch("line_items")?.map((lineItem: any, index: number) => (
                <div key={index} className="flex gap-[10px] md:items-center">
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
          <div className="flex gap-5 mt-6">
            <Button
              className="bg-blue-600 sm:h-[40px] h-[30px] w-[100px] hover:bg-blue-500 "
              type="submit"
            >
              {"Save"}
            </Button>
            <Button className="bg-red-600 sm:h-[40px] h-[30px]  hover:bg-red-500">
              <Link href={`/dashboard/invoices`}>
                {"Cancel"}
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InvoiceForm;
