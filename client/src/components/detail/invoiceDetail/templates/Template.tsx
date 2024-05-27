"use client";
import { ReactToPrint } from "react-to-print";
import { useEffect, useState, useRef } from "react";
import { ArrowUp} from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchInvoice, updateInvoice, updateInvoiceTemplate } from "@/redux/actions/invoices";
import { CardContent } from "@/components/Card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import InvoiceTemplateV1 from "./invoice-template-v1";
import InvoiceTemplateV2 from "./invoice-template-v2";
import InvoiceTemplateV3 from "./invoice-template-v3";
import InvoiceTemplateV4 from "./invoice-template-v4";
import InvoiceTemplateV5 from "./invoice-template-v5";
import CustomFieldsForm from "./CustomFieldsForm";
import { InvoiceProps } from "../../../schemas/InvoiceProps";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  templateVersion:z.string().optional()

});

export default function Template({ params }: any) {
  const id = params.id as string;
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      templateVersion:"",
    },
    
  });

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


  const handleSendEmail = () => {
    axios
      .get(`https://invoicesystm-app.onrender.com/api/mailer/${id}`)
      .then((response: { data: React.SetStateAction<string> }) => {
        alert("email send successfully!");
        setEmail(response.data);
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  try {
    await dispatch<any>(updateInvoiceTemplate(id, values, router));
    // Fetch the updated invoice data and update the state
    const updatedInvoice = await dispatch<any>(fetchInvoice(id));
    setInvoice(updatedInvoice);
  } catch (error) {
    console.error("Error:", error);
  }
};

  const componentRef = useRef(null);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex gap-4">
            <ReactToPrint
              trigger={() => {
                return (
                  <Button
                  onClick={handleSendEmail}
                  className="bg-transparent border border border-purple-600 text-purple-600 hover:bg-transparent"
                  >
                      <span>Download/Print Pdf</span>
                  </Button>
                );
              }}
              content={() => componentRef.current}
              pageStyle="print"
            />
            <Button
              onClick={handleSendEmail}
              className="bg-transparent border border border-purple-600 text-purple-600 hover:bg-transparent"
            >
              Email
            </Button>
          </div>
        </div>
        <div>
          <CardContent className="absolute w-[200px] h-[80px] top-[70px] right-[0px]">
            <div>
          <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[100%] flex flex-col gap-5"
        >
          <div className='flex gap-5 flex-wrap'>
            <div className=''>
          <div className="w-[100%] flex gap-5">
              <FormField
              control={form.control}
              name="templateVersion"
              render={({ field }: any) => (
                <FormItem className="flex flex-col gap-[10px]  items-center">
                  <FormLabel>Select Template V</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                     
                      className=" text-center w-[150px] ">
                      <option value={invoice?.templateVersion}>{invoice?.templateVersion}</option>
                      <option value='v1'>ver1</option>
                      <option value='v2'>ver2</option>
                      <option value='v3'>ver3</option>
                      <option value='v4'>ver4</option>
                      <option value='v5'>ver5</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            </div>
          </div>
          <div className='flex gap-5 '>
        <Button className='bg-transparent hover:bg-transparent flex text-purple-600 font-semibold items-center space-x-2 px-5 rounded-sm border border-purple-600' type='submit'>
          Save
        </Button>
        </div>
        </form>
      </Form>

            </div>
          </CardContent>
        </div>
      </div>
   <div className="relative invoice max-w-[740px] mx-auto bg-white p-16  border border-gray-300 rounded-md">
        <div ref={componentRef} className="">
      <div className="">
  {invoice?.templateVersion === "v1" && (
    <div>
      <InvoiceTemplateV1 params={params} />
    </div>
  )}
  {invoice?.templateVersion === "v2" && (
    <div>
      <InvoiceTemplateV2 params={params} />
    </div>
  )}
  {invoice?.templateVersion === "v3" && (
    <div>
      <InvoiceTemplateV3 params={params} />
    </div>
  )}
  {invoice?.templateVersion === "v4" && (
    <div>
      <InvoiceTemplateV4 params={params} />
    </div>
  )}
  {invoice?.templateVersion === "v5" && (
    <div>
      <InvoiceTemplateV5 params={params} />
    </div>
  )}
</div>
      <CustomFieldsForm params={params}/>
        </div>
      </div>
      <Button
        onClick={() => window.scrollTo(0, 0)}
        className="absolute  bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400"
      >
        <p>
          <ArrowUp />
        </p>
      </Button>
    </>
  );
}