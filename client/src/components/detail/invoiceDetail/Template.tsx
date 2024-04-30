"use client";
import { ReactToPrint } from "react-to-print";
import { useEffect, useState , useRef } from "react";
import { ArrowUp,HandMetal  } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/Card";
import axios  from "axios";
import { updateCompany } from "@/redux/actions/items";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type InvoiceProps = {
  status: any;
  date?: any;
  due_date?: any;
  invoice_number?: any;
  total_amount?: any;
  client?: any;
  line_items?: any;
  company?: any;
};

const FormSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email('Invalid email').optional() ,  
    general_manager_name:z.string().optional(),
    company_number      :z.string().optional(),     
    vat_reg_number      :z.string().optional(),     
    house_no            :z.string().optional(),     
    po_box              :z.string().optional(),     
    fax                 :z.string().optional(),     
    tel1                :z.string().optional(),
    tel2                :z.string().optional(),
    country             :z.string().optional(),
    region              :z.string().optional(),
    city                :z.string().optional(),
    subcity             :z.string().optional(),
    woreda              :z.string().optional(),
    kebele              :z.string().optional(),
    description         :z.string().optional(),
  })

export default function Template({ params }: any) {
  const id = params.id as string;
  const router = useRouter();
  const [template, setTemplate] = useState('');
  const [email, setEmail] = useState('');
  const [color, setColor] = useState('#000000');
  const [text, setText] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('v1');

  const handleSendEmail = () => {
    axios
    .get(`https://invoicesystm-app.onrender.com/api/mailer/${id}`)
    .then((response: { data: React.SetStateAction<string>; }) => {
      alert("email send successfully!")
      setEmail(response.data);
      console.log(response.data)
    })
    .catch((error: any) => {
      console.error(error);
    });
}
  
  const handleColorChange = (event: { target: { value: any; }; }) => {
    const newColor = event.target.value;
    // Send a PUT request to update the color on the server
    axios
      .put('https://invoicesystm-app.onrender.com/api/color', { color: newColor })
      .then(() => {
        setColor(newColor);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleVersionChange = (event: { target: { value: any; }; }) => {
    const selectedVersion = event.target.value;
    setSelectedVersion(selectedVersion);
  };

  useEffect(() => {
    if (selectedVersion) {
      axios
        .get(`https://invoicesystm-app.onrender.com/api/templates/${selectedVersion}/${id}`)
        .then((response: { data: React.SetStateAction<string>; }) => {
          setTemplate(response.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [selectedVersion]);

  const [loader, setLoader] = useState(false);
  const componentRef = useRef(null);
 const dispatch = useDispatch();
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

  console.log('invoice?.company?.name',invoice?.company?.name)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: invoice?.company.name,
      email: invoice?.company?.email,
    },
  });
 
  const onSubmit= (values: z.infer<typeof FormSchema>) => {
  
      dispatch<any>(updateCompany(invoice?.company?.id,values,router));
  };


  return (
    <>
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
          <div className="flex gap-4">
            <ReactToPrint
              trigger={() => {
                return (
            <Button
              disabled={loader}
              className="bg-transparent border border border-purple-600 text-purple-600 hover:bg-transparent"
            >
              {loader ? <span>Downloading</span> : <span>Download/Print Pdf</span>}
            </Button>
                )}}
             content={() =>componentRef.current}
             pageStyle="print"
            />
            <Button  onClick={handleSendEmail} className="bg-transparent border border border-purple-600 text-purple-600 hover:bg-transparent">
              Email
            </Button>
          </div>
      </div>
      <div>
        <CardContent className="absolute w-[200px] h-[80px] top-[70px] right-[0px]">
        <div>
      <div>Select Template V</div>
      <select value={selectedVersion} onChange={handleVersionChange}>
        <option value="v1">Version 1</option>
        <option value="v2">Version 2</option>
        <option value="v3">Version 3</option>
        <option value="v4">Version 4</option>
        <option value="v5">Version 5</option>
      </select>
      <input type="color" value={color} onChange={handleColorChange} />
        </div>
        </CardContent>
      </div>
    </div>
    <div 
      className="relative invoice max-w-[740px] mx-auto bg-white p-16  border border-gray-300 rounded-md" >
    <div 
    ref={componentRef}
        className=" p-16">
          <div  style={{ color }} dangerouslySetInnerHTML={{ __html: template }}/>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-[100%] flex flex-col gap-5'>
        <div className={`absolute ${selectedVersion === 'v2' && 'top-[13rem]'}  ${selectedVersion === 'v3' && 'top-[21rem]'} ${selectedVersion === 'v4' ? 'top-[1rem] right-[-10rem]':'top-[16rem]'} details flex flex-col w-1/2 mt-6`}>
        <FormField
       control={form.control}
  name='name'
  render={({ field }: any) => (
    <FormItem>
      <FormControl>
    <input className='h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 ' type='text' defaultValue={invoice?.company.name} {...field}  />
    </FormControl>
      <FormMessage />
    </FormItem>
  )}/>
   <FormField
            control={form.control}
            name='email'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <input className='w-[18vw]' defaultValue={invoice?.company.email} placeholder='youremail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
       control={form.control}
  name='country'
  render={({ field }: any) => (
    <FormItem>
      <FormControl>
    <input className='h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 ' type='text' defaultValue={invoice?.company.country} {...field}  />
    </FormControl>
      <FormMessage />
    </FormItem>
  )}/>
        <FormField
       control={form.control}
  name='city'
  render={({ field }: any) => (
    <FormItem>
      <FormControl>
    <input className='h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400' placeholder="city" type='text' defaultValue={invoice?.company?.city} {...field}  />
    </FormControl>
      <FormMessage />
    </FormItem>
  )}/>
        <FormField
       control={form.control}
  name='kebele'
  render={({ field }: any) => (
    <FormItem>
      <FormControl>
    <input className='h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 ' type='text' defaultValue={invoice?.company.kebele} {...field}  />
    </FormControl>
      <FormMessage />
    </FormItem>
  )}/>
</div>
        <div className='flex gap-5 mt-6'>
    
                <Button className='absolute bg-transparent hover:bg-transparent top-[-60px] right-[20rem] flex text-purple-600 font-semibold items-center space-x-2 px-3 py-2 rounded-sm border border-purple-600'>
                  
                    <span>Save Online</span>
                    </Button>
        </div>
      </form>
    </Form>
   
        </div>
        </div>

      <Button onClick={()=>window.scrollTo(0,0)} className="absolute  bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400">
      <p><ArrowUp /></p> 
  </Button>
  </>
  );
}

